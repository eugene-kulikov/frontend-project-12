import { configureStore } from '@reduxjs/toolkit';
import chatReducer from './channelsSlice.js';
import messagesReducer from './messagesSlice.js';
import modalsReducer from './modalsSlice.js';

export default configureStore({
  reducer: {
    channels: chatReducer,
    messages: messagesReducer,
    modals: modalsReducer,
  },
});
