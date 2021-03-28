import { createSlice } from '@reduxjs/toolkit';

// The initial state of the issue component
export const initialState = {
  data: [],
  loading: false,
  error: false,
};

export const slice = createSlice({
  name: 'issueWordAnalysis',
  initialState,
  reducers: {
    fetchData(state) {
      state.loading = true;
      state.error = false;
      state.data = [];
    },
    fetchSuccess(state, action) {
        console.log("REDUCER PAYLOAD: ", action.payload)
      state.data = action.payload;
      state.loading = false;
    },
    fetchFailure(state, action) {
      state.error = action.payload.error;
      state.loading = false;
    },
  },
});

export const { fetchData, fetchSuccess, fetchFailure } = slice.actions;
export const selectFetch = (state:any) => state.issue.data
export default slice.reducer;