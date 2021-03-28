import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import counterReducer from '../components/counterSlice';
import issueReducer from '../components/issueSlice';
import createSagaMiddleware from "redux-saga";
import saga from './sagas'

let sagaMiddleware = createSagaMiddleware();
const middleware = [...getDefaultMiddleware({ thunk: false }), sagaMiddleware];

export default configureStore({
  reducer: {
    counter: counterReducer,
    issue: issueReducer
  },
  middleware
});

sagaMiddleware.run(saga)
