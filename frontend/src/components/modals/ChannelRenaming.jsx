import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, Form, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import leoProfanity from 'leo-profanity';
import socket from '../../utils/socket.js';
import { actions as modalsActions } from '../../slices/modalsSlice.js';
import { selectorChannels } from '../../slices/channelsSlice.js';

function ChannelRenaming() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const channels = useSelector(selectorChannels.selectAll);
  const channelId = useSelector((store) => store.modals.channelId);
  const selectedChannel = useSelector((store) => selectorChannels.selectById(store, channelId));
  const channelsNames = channels.map((channel) => channel.name);
  const close = () => dispatch(modalsActions.closeModal());
  const inputRef = useRef();
  const [stateSubmit, changeStateSubmit] = useState(false);

  useEffect(() => {
    inputRef.current.focus();
    inputRef.current.select();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: selectedChannel.name ?? '',
    },
    validationSchema: yup.object({
      name: yup.string()
        .required(t('validation.required'))
        .min(3, t('validation.intervalLength'))
        .max(20, t('validation.intervalLength'))
        .notOneOf(channelsNames, t('validation.unique')),
    }),
    onSubmit: (form) => {
      const name = leoProfanity.clean(form.name);
      inputRef.current.disabled = true;
      changeStateSubmit(true);
      socket.timeout(5000).emit('renameChannel', { name, id: channelId }, (err) => {
        if (err) {
          toast.error(t('toast.error.network'));
        } else {
          close();
        }
        inputRef.current.disabled = false;
        changeStateSubmit(false);
      });
    },
  });

  const isInvalid = formik.touched.name && formik.errors.name;

  return (
    <Modal show onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>{t('component.modal.rename.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
              onChange={formik.handleChange}
              value={formik.values.name}
              className="mb-2"
              isInvalid={isInvalid}
              id="name"
              name="name"
              ref={inputRef}
              />
            <Form.Label className="visually-hidden" htmlFor="name">{t('component.modal.rename.label')}</Form.Label>
            {isInvalid && <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>}

            <div className="d-flex justify-content-end">
              <Button onClick={close} className="me-2" variant="secondary">
                {t('component.modal.rename.cancel')}
              </Button>
              <Button type="submit" disabled={stateSubmit}>
                {t('component.modal.rename.confirm')}
              </Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default ChannelRenaming;
