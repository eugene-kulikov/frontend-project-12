import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { fetchDataChat } from './channelsSlice.js';

const messagesAdapter = createEntityAdapter();
const initialState = messagesAdapter.getInitialState();

const channelsSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDataChat.fulfilled, (state, { payload: { messages } }) => {
        messagesAdapter.setAll(state, messages);
      });
  },
});

export const selectorMessages = messagesAdapter.getSelectors((state) => state.messages);

export default channelsSlice.reducer;
