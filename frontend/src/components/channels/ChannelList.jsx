import React from 'react';
import { Col, Nav } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { selectorChannels } from '../../slices/channelsSlice.js';
import { actions as modalsActions } from '../../slices/modalsSlice.js';
import ChannelItem from './ChannelItem.jsx';
import { ReactComponent as AddIcon } from '../../assets/icons/add.svg';

const ChannelList = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const channels = useSelector(selectorChannels.selectAll);
  const add = () => dispatch(modalsActions.showModal({ type: 'addChannel' }));

  return (
    <Col md={2} className="col-4 border-end pt-5 px-0 bg-light">
      <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
        <span>{t('page.home.channels.title')}</span>
        <button onClick={add} type="button" className="p-0 text-primary btn btn-group-vertical">
          <AddIcon />
          <span className="visually-hidden">+</span>
        </button>
      </div>

      <Nav as="ul" className="flex-column px-2" variant="pills" fill>
        {channels.map((channel) => (
          <ChannelItem key={channel.id} channel={channel} />
        ))}
      </Nav>
    </Col>
  );
};

export default ChannelList;
