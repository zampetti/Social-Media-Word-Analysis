import { createSlice } from '@reduxjs/toolkit';

// The initial state of the issue component
export const initialState = {
  query: '',
  data: [],
  loading: false,
  error: false,
};

export const slice = createSlice({
  name: 'FETCH',
  initialState,
  reducers: {
    fetchData(state, action) {
      console.log("FETCH DATA ACTION TYPE: ", action.type)
      state.query = action.payload
      state.loading = true;
      state.error = false;
      state.data = [];
    },
    fetchSuccess(state, action) {
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
export const selectQuery = (state:any) => state.issue.query
export const selectFetch = (state:any) => state.issue.data
export const selectLoad = (state:any) => state.issue.loading
export default slice.reducer;