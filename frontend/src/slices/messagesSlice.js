import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { fetchDataChat } from './channelsSlice.js';

const messagesAdapter = createEntityAdapter();
const initialState = messagesAdapter.getInitialState();

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: messagesAdapter.addOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDataChat.fulfilled, (state, { payload: { messages } }) => {
        messagesAdapter.setAll(state, messages);
      });
  },
});

export const { actions } = messagesSlice;

export const selectorMessages = messagesAdapter.getSelectors((state) => state.messages);

export default messagesSlice.reducer;
