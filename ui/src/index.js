import React from 'react';
import ReactDOM from 'react-dom';
import store from './redux/store'
import { Provider } from 'react-redux'

import App from './App'
 
const title = 'Twitter Word Count and Ngrams';
 
ReactDOM.render(
  <Provider store={store}>
    <App title={title} />
  </Provider>,
  document.getElementById('app')
);

module.hot.accept();