import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';
import socket from '../../utils/socket.js';
import { actions as modalsActions } from '../../slices/modalsSlice.js';
import { actions as channelsActions } from '../../slices/channelsSlice.js';

function ChannelDeleting() {
  const dispatch = useDispatch();
  const close = () => dispatch(modalsActions.closeModal());
  const channelId = useSelector((store) => store.modals.channelId);

  const removeChannel = () => {
    socket.emit('removeChannel', { id: channelId });
    dispatch(channelsActions.setCurrentChannelId(1));
    close();
  };

  return (
      <Modal show onHide={close}>
        <Modal.Header closeButton>
          <Modal.Title>Удалить канал</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="lead">Уверены?</p>
          <div className="d-flex justify-content-end">
            <Button className="me-2" variant="secondary" onClick={close} >
              Отменить
            </Button>
            <Button type="submit" variant="danger" onClick={removeChannel}>
              Удалить
            </Button>
          </div>
        </Modal.Body>
      </Modal>
  );
}

export default ChannelDeleting;
