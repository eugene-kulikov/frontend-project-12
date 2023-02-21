import { toast } from 'react-toastify';
import { useEffect } from 'react';
import socket from '../utils/socket.js';
import { actions as messagesActions } from '../slices/messagesSlice.js';
import { actions as channelsActions } from '../slices/channelsSlice.js';

export default function useChatConnection(dispatch, t) {
  useEffect(() => {
    socket.on('newMessage', (response) => {
      dispatch(messagesActions.addMessage(response));
    });
    socket.on('newChannel', (response) => {
      dispatch(channelsActions.addChannel(response));
      dispatch(channelsActions.setCurrentChannelId(response.id));
      toast.success(t('toast.success.addChannel'));
    });
    socket.on('removeChannel', (response) => {
      dispatch(channelsActions.removeChannel(response.id));
      toast.success(t('toast.success.removeChannel'));
    });
    socket.on('renameChannel', (response) => {
      dispatch(channelsActions.updateChannel({ id: response.id, changes: response }));
      toast.success(t('toast.success.renameChannel'));
    });

    return () => {
      socket.off('newMessage');
      socket.off('newChannel');
      socket.off('removeChannel');
      socket.off('renameChannel');
    };
  }, [dispatch, t]);
}
