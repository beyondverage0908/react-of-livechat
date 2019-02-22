import axios from 'axios'

const LOAD_USERLIST = 'LOAD_USERLIST'

const initState = {
    userList: []
}

export function chatuser(state = initState, action) {
    switch(action.type) {
        case LOAD_USERLIST:
            return {...state, userList: action.payload.data}
        default:
            return state
    }
}


// actions
function getUserListSuccess(data) {
    return {type: LOAD_USERLIST, payload: data}
}

// 获取牛人/boss列表
export function getUserList(type) {
    return dispatch => {
        axios.get(`/user/list?type=${type}`)
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    dispatch(getUserListSuccess(res.data))
                } else {
                    dispatch(res.data)
                }
            })
    }
}