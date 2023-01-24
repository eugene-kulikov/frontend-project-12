import React, { useEffect, useRef } from 'react';
import {
  Col, Form, InputGroup, Button,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import leoProfanity from 'leo-profanity';
import ChatContent from './ChatContent.jsx';
import socket from '../../utils/socket.js';
import useAuth from '../../hook/useAuth.js';
import { selectorMessages } from '../../slices/messagesSlice.js';
import { selectorChannels } from '../../slices/channelsSlice.js';

function Chat() {
  const messageRef = useRef();
  const { username } = useAuth();
  const { t } = useTranslation();
  const currentChannelId = useSelector((store) => store.channels.currentChannelId);
  const channel = useSelector((store) => selectorChannels.selectById(store, currentChannelId));
  const allMessages = useSelector(selectorMessages.selectAll);
  const messages = allMessages.filter(({ channelId }) => channelId === currentChannelId);
  const messagesCount = messages.length;

  useEffect(() => {
    messageRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    onSubmit: ({ body }, { resetForm }) => {
      const message = leoProfanity.clean(body);
      const newMessageData = {
        username,
        message,
        channelId: currentChannelId,
      };
      messageRef.current.disabled = true;
      socket.timeout(5000).emit('newMessage', newMessageData, (err) => {
        if (err) {
          toast.error(t('toast.error.network'));
        } else {
          resetForm();
          messageRef.current.blur();
        }
        messageRef.current.disabled = false;
      });
    },
  });

  return (
    <Col className="p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0"><b># {channel?.name}</b></p>
          <span className="text-muted">{messagesCount} {t('page.home.chat.messages')}</span>
        </div>
        <ChatContent messages={messages} />
        <div className="mt-auto px-5 py-3">
          <Form className="py-1 border rounded-2" onSubmit={formik.handleSubmit}>
            <InputGroup className="has-validation">
              <Form.Control
                ref={messageRef}
                name="body"
                placeholder={t('page.home.chat.placeholderMessage')}
                aria-label={t('page.home.chat.newMessage')}
                className="border-0 p-0 ps-2"
                value={formik.values.body}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <Button type="submit" variant="" disabled="" className="btn-group-vertical">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                  <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
                </svg>
                <span className="visually-hidden">{t('page.home.chat.confirm')}</span>
              </Button>
            </InputGroup>
          </Form>
        </div>
      </div>
    </Col>
  );
}

export default Chat;
