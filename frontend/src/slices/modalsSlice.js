import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

const modalsAdapter = createEntityAdapter();
const initialState = modalsAdapter.getInitialState({ type: null, channelId: null });

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    showModal: (state, { payload: { type, channelId } }) => {
      state.type = type;
      state.channelId = channelId;
    },
    closeModal: (state) => {
      state.type = null;
      state.channelId = null;
    },
  },
});

export const { actions } = modalsSlice;
export default modalsSlice.reducer;
