import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss'
import Game from './components/Game';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import rootReducer from './store/reducers'
import { composeWithDevTools } from 'redux-devtools-extension';


const store = createStore(rootReducer, composeWithDevTools(
  applyMiddleware()
))

ReactDOM.render(
  <Provider store={store}>
    <Game/>
  </Provider>,
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
