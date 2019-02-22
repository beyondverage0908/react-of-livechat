import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { List, Badge } from 'antd-mobile'

@connect(
  state=>state,
)
@withRouter
class Msg extends Component {

  componentDidMount() { 
  }

  getLastItem(arr) {
    return arr[arr.length - 1]
  }

  getUnread(groupMsgs) {
    let unread = 0
    groupMsgs.forEach(v => {
      if (!v.read && this.props.user._id === v.to) ++unread
    })
    return unread
  }

  handleStartMsg(targetId) {
    this.props.history.push(`/chat/${targetId}`)
  }

  render() {

    const userId = this.props.user._id

    let Item = List.Item
    let Brief = Item.Brief

    let msgGroup = {}
    // 根据chatid分组
    this.props.chat.msgs.forEach(v => {
      if (v.chatid.indexOf(userId) > -1) {
        if (!msgGroup[v.chatid] || !msgGroup[v.chatid].length) {
          msgGroup[v.chatid] = [v]
        } else {
          msgGroup[v.chatid].push(v)
        }
      }
    });
    // 获取消息数组项的最后一条数据
    let chatList = Object.values(msgGroup).sort((a, b) => {
      let a_last = this.getLastItem(a).create_time
      let b_last = this.getLastItem(b).create_time
      return b_last - a_last
    })

    return (
      <div id="msg-list">
        {chatList.map(v => {
          let lastMsg = this.getLastItem(v)
          // 聊天的对象
          let targetId = lastMsg.from === userId ? lastMsg.to : lastMsg.from
          // 获取分组中所有的未读消息
          let unread = this.getUnread(v)
          return (
            <List key={lastMsg._id}>
              <Item
                thumb={require(`../img/${this.props.chat.users[targetId].avatar}.png`)}
                extra={unread > 0 ? <Badge text={unread < 100 ? unread : '99+'}></Badge> : null}
                arrow='horizontal'
                onClick={() => this.handleStartMsg(targetId)}
              >
                {lastMsg.content}
                <Brief>{this.props.chat.users[targetId].user}</Brief>
              </Item>
            </List>
          )
        })}
      </div>
    )
  }
}

export default Msg;