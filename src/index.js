import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { createStore, applyMiddleware } from 'redux';
import reducer from './reducers/destinations-reducer.js';
import { Provider } from 'react-redux';
import "bootstrap/dist/css/bootstrap.min.css";
import thunkMiddleware from 'redux-thunk';
import middlewareLogger from './middleware/middleware-logger';

const store = createStore(reducer, applyMiddleware(middlewareLogger, thunkMiddleware));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
