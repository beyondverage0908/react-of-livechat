import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import reducers from './reducer';
import './config';
import Login from './container/login/login';
import Register from './container/register/register';
import AuthRoute from './component/authroute/authroute';
import BossInfo from './container/bossinfo/bossinfo';
import GeniusInfo from './container/geniusinfo/geniusinfo'
import Chat from './component/chat/chat'
import Dashboard from './component/dashboard/dashboard'
import './index.css';

// 主要用于redux的调试
const reduxDevtools = window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f;
const store = createStore(reducers, compose(
    applyMiddleware(thunk),
    reduxDevtools
));

//// - 使用react-redux
ReactDOM.render(
    (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <Route path='/' component={AuthRoute}></Route>
            <Switch>
              <Route path='/login' component={Login}></Route>
              <Route path='/register' component={Register}></Route>
              <Route path='/bossinfo' component={BossInfo}></Route>
              <Route path='/geniusinfo' component={GeniusInfo}></Route>
              <Route path='/chat/:user' component={Chat}></Route>
              <Route component={Dashboard}></Route>
            </Switch>
          </div>
        </BrowserRouter>  
      </Provider>
    ), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
