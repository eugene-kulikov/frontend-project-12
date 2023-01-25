import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import socket from '../../utils/socket.js';
import { actions as modalsActions } from '../../slices/modalsSlice.js';
import { actions as channelsActions } from '../../slices/channelsSlice.js';

const ChannelDeleting = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const close = () => dispatch(modalsActions.closeModal());
  const channelId = useSelector((store) => store.modals.channelId);
  const [stateSubmit, changeStateSubmit] = useState(false);

  const removeChannel = () => {
    changeStateSubmit(true);
    socket.timeout(5000).emit('removeChannel', { id: channelId }, (err) => {
      if (err) {
        toast.error(t('toast.error.network'));
      } else {
        dispatch(channelsActions.setCurrentChannelId(1));
        close();
      }
      changeStateSubmit(false);
    });
  };

  return (
    <Modal show onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>{t('component.modal.remove.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('component.modal.remove.question')}</p>
        <div className="d-flex justify-content-end">
          <Button className="me-2" variant="secondary" onClick={close}>
            {t('component.modal.remove.cancel')}
          </Button>
          <Button type="submit" variant="danger" disabled={stateSubmit} onClick={removeChannel}>
            {t('component.modal.remove.confirm')}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ChannelDeleting;
