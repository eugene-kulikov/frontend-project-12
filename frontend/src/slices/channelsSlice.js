import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import routes from '../routes.js';
import http from '../utils/requests.js';

export const fetchDataChat = createAsyncThunk(
  'chat/fetchDataChat',
  async () => {
    const response = await http.get(routes.chatPath());
    console.log('response from request', response);
    return response;
  },
);

const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter.getInitialState({ loading: 'idle', error: null, currentChannelId: 1 });

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDataChat.fulfilled, (state, { payload: { channels } }) => {
        channelsAdapter.setAll(state, channels);
      });
  },
});

export const selectorChannels = channelsAdapter.getSelectors((state) => state.channels);

export default channelsSlice.reducer;
