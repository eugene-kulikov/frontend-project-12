import React from 'react';
import { useSelector } from 'react-redux';
import getModal from './index.js';

function Modal() {
  const modal = useSelector((store) => store.modals);
  if (!modal.type) return null;
  const ModalWindow = getModal(modal.type);
  return (
      <ModalWindow/>
  );
}

export default Modal;
