import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import App from './app/App';
import makeStore from './app/store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={makeStore()}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

