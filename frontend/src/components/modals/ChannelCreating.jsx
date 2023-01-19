import React, { useEffect, useRef } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { selectorChannels } from '../../slices/channelsSlice.js';
import { actions as modalsActions } from '../../slices/modalsSlice.js';
import socket from '../../utils/socket.js';

function ChannelCreating() {
  const dispatch = useDispatch();
  const channels = useSelector(selectorChannels.selectAll);
  const channelsNames = channels.map((channel) => channel.name);
  const close = () => dispatch(modalsActions.closeModal());
  const inputRef = useRef();
  const { t } = useTranslation();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: yup.object({
      name: yup.string()
        .required(t('validation.required'))
        .min(3, t('validation.intervalLength'))
        .max(20, t('validation.intervalLength'))
        .notOneOf(channelsNames, t('validation.unique')),
    }),
    onSubmit: ({ name }) => {
      console.log('adding channel form', name);
      socket.emit('newChannel', { name });
      close();
    },
  });

  const isInvalid = formik.touched.name && formik.errors.name;

  return (
        <Modal show onHide={close}>
            <Modal.Header closeButton>
                <Modal.Title>{t('component.modal.add.title')}</Modal.Title>
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
                        <Form.Label className="visually-hidden" htmlFor="name">{t('component.modal.add.label')}</Form.Label>
                        {isInvalid && <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>}

                        <div className="d-flex justify-content-end">
                            <Button onClick={close} className="me-2" variant="secondary">
                                {t('component.modal.add.cancel')}
                            </Button>
                            <Button type="submit">
                                {t('component.modal.add.confirm')}
                            </Button>
                        </div>
                    </Form.Group>
                </Form>
            </Modal.Body>
        </Modal>
  );
}

export default ChannelCreating;
