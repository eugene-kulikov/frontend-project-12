import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, Form, Modal } from 'react-bootstrap';
import socket from '../../utils/socket.js';
import { actions as modalsActions } from '../../slices/modalsSlice.js';
import { selectorChannels } from '../../slices/channelsSlice.js';

function ChannelRenaming() {
  const dispatch = useDispatch();
  const channels = useSelector(selectorChannels.selectAll);
  const channelId = useSelector((store) => store.modals.channelId);
  const selectedChannel = useSelector((store) => selectorChannels.selectById(store, channelId));
  const channelsNames = channels.map((channel) => channel.name);
  const close = () => dispatch(modalsActions.closeModal());
  const inputRef = useRef();

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
        .required('Обязательное поле')
        .min(3, 'От 3 до 20 символов')
        .max(20, 'От 3 до 20 символов')
        .notOneOf(channelsNames, 'Должно быть уникальным'),
    }),
    onSubmit: ({ name }) => {
      socket.emit('renameChannel', { name, id: channelId });
      close();
    },
  });

  const isInvalid = formik.touched.name && formik.errors.name;

  return (
      <Modal show onHide={close}>
        <Modal.Header closeButton>
          <Modal.Title>Переименовать канал</Modal.Title>
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
              <Form.Label className="visually-hidden" htmlFor="name">Имя канала</Form.Label>
              {isInvalid && <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>}

              <div className="d-flex justify-content-end">
                <Button onClick={close} className="me-2" variant="secondary">
                  Отменить
                </Button>
                <Button type="submit">
                  Отправить
                </Button>
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
  );
}

export default ChannelRenaming;
