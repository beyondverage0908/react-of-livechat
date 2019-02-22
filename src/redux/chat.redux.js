import axios from 'axios'
import io from 'socket.io-client'

const socket = io('ws://localhost:9093')

const MSG_LIST = 'MSG_LIST'
const RECV_MSG = 'RECV_MSG'
const READ_MSG = 'READ_MSG'

const initState = {
    msgs: [],
    users: {},
    unread: 0
}

function getUnread(msgs, userId) {
    if (!msgs || !msgs.length) {
        return 0
    }
    let unreadMsgs = msgs.filter(v => (!v.read && v.to === userId))
    return unreadMsgs.length
}

function resetMsgReadState(msgs, chatId) {
    if (!msgs || !msgs.length) return;
    let newMsgs = msgs.map(v => {
        if (!v.read && v.chatid == chatId) {
            v['read'] = true;
        } 
        return v
    })
    return newMsgs
}

export function chat(state = initState, action) {
    switch(action.type) {
        case MSG_LIST:
            return {
                ...state, 
                ...action.payload, 
                unread: getUnread(action.payload.msgs, action.payload.userId)
            }
        case RECV_MSG: 
            return {
                ...state,
                msgs: [...state.msgs, action.payload],
                unread: (action.payload.to === action.payload.userId && action.payload.channel !== 'chat') ? state.unread + 1 : state.unread
            }
        case READ_MSG:
            return {
                ...state, 
                ...action.payload,
                unread: state.unread - action.payload.num,
                msgs: resetMsgReadState(state.msgs, action.payload.chatId)
            }
        default:
            return state
    }
}

function msgList(data) {
    return {type: MSG_LIST, payload: data}
}

function recvmsg(data) {
    return {type: RECV_MSG, payload: data}
}

function readmsg(data) {
    return {type: READ_MSG, payload: data}
}

export function readMsg({from}) {
    return (dispatch, getState) => {
        axios.post('/user/readmsg', {from})
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    let userId = getState().user._id
                    let chatId = [userId, from].sort().join(',')
                    dispatch(readmsg({...res.data, chatId}))
                }
            })
    }
}

export function getMsgList(toUserId) {
    return (dispatch, getState) => {
        axios.get(`/user/msglist?toUserId=${toUserId}`)
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    const userId = getState().user._id;
                    res.data['userId'] = userId;
                    dispatch(msgList(res.data))
                }
            })
    }
}

export function sendMsg({from, to, msg}) {
    return dispatch => {
        socket.emit('sendmsg', {from, to, msg})
    }
}

export function recvMsg(channel) {
    return (dispatch, getState) => {
        socket.on('recvmsg', data => {
            let userId = getState().user._id
            data['userId'] = userId
            dispatch(recvmsg({...data, channel}))
        })
    }
}