import React from 'react';
import {
  Button, ButtonGroup, Dropdown, Nav,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import { actions as channelsActions } from '../../slices/channelsSlice.js';
import { actions as modalsActions } from '../../slices/modalsSlice.js';

function ChannelItem({ channel }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const currentChannelId = useSelector((store) => store.channels.currentChannelId);
  const variant = currentChannelId === channel.id ? 'secondary' : '';
  const buttonClasses = ['w-100', 'rounded-0', 'text-start', {
    'text-truncate': channel.removable,
  }];

  const buildDefaultButton = () => (
        <Button type="button"
                className={cn(buttonClasses)}
                onClick={() => dispatch(channelsActions.setCurrentChannelId(channel.id))}
                variant={variant}>
            <span className="me-1">#</span>{channel.name}
        </Button>
  );

  const buildEditableButton = () => (
      <Dropdown as={ButtonGroup} className="d-flex">
          {buildDefaultButton()}

          <Dropdown.Toggle
              className="flex-grow-0"
              id="dropdown-split-basic"
              variant={variant}
              split
          >
              <span className="visually-hidden">
                {t('page.home.channels.dropdown.management')}
              </span>
          </Dropdown.Toggle>

          <Dropdown.Menu>
              <Dropdown.Item onClick={() => dispatch(modalsActions.showModal({ type: 'removeChannel', channelId: channel.id }))}>
                  {t('page.home.channels.dropdown.remove')}
              </Dropdown.Item>
              <Dropdown.Item onClick={() => dispatch(modalsActions.showModal({ type: 'renameChannel', channelId: channel.id }))}>
                  {t('page.home.channels.dropdown.rename')}
              </Dropdown.Item>
          </Dropdown.Menu>
      </Dropdown>
  );

  return (
      <Nav.Item as="li" className="w-100">
          {channel.removable ? buildEditableButton() : buildDefaultButton()}
      </Nav.Item>
  );
}

export default ChannelItem;
