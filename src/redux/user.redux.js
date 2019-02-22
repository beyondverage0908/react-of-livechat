import axios from "axios";
import { getRedirectPath } from '../util';

const ERROR_MSG = 'ERROR_MSG';
const AUTH_SUCCESS = 'AUTH_SUCCESS';
const LOAD_DATA = 'LOAD_DATA';
const USER_LOGOUT = 'USER_LOGOUT';

const initState = {
    redirectTo: '',
    isAuth: '',
    msg: '',
    user: '',
    type: ''
}

// reducer: 处理状态的改变 - 通过接受action，触发store中state的状态的改变
export function user(state = initState, action) {
    switch(action.type) {
        case AUTH_SUCCESS:
            return {...state, redirectTo: getRedirectPath(action.playload), isAuth: true, ...action.playload}
        case LOAD_DATA: 
            return {...state, ...action.playload}
        case ERROR_MSG:
            return {...state, isAuth: false, msg: action.msg}
        case USER_LOGOUT:
            return {...state, ...initState, redirectTo: '/login'}
        default: 
            return state
    }
}

// actions: 负责传消息，并在消息中携带消息体 类似(state, action) => state'
function authSucess(data) {
    return {type: AUTH_SUCCESS, playload: data} 
}

function errorMsg(msg) {
    return {type: ERROR_MSG, msg}
}

export function loadData(playload) {
    return {type: LOAD_DATA, playload: playload}
}

export function logout() {
    return {type: USER_LOGOUT}
}

// dispatch: 触发相应的的action，这一部分的方法可以通过react-redux注入到组件中，在组件中触发dispatch
export function register({user, pwd, repeatpwd, type}) {
    if (!user || !pwd || !type) {
        return errorMsg('用户名密码必须输入')
    }
    if (pwd !== repeatpwd) {
        return errorMsg('密码和确认密码必须一致')
    }
    return dispatch => {
        axios.post('/user/register', {user, pwd, type})
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    dispatch(authSucess(res.data.data));
                } else {
                    dispatch(errorMsg(res.data.msg));
                }
            })
    }
}

export function login({user, pwd}) {
    if (!user || !pwd) {
        return errorMsg('请填写帐号和密码后再登录')
    }
    return dispatch => {
        axios.post('/user/login', {user, pwd})
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    dispatch(authSucess(res.data.data))
                } else {
                    dispatch(errorMsg(res.data.msg));
                }
            })
    }
}

export function update(data) {
    return dispatch => {
        axios.post('/user/update', data)
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    dispatch(authSucess(res.data.data))
                } else {
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }
}


