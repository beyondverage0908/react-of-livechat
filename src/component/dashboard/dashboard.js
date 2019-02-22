import React, { Component } from 'react'
import { NavBar } from 'antd-mobile'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import NavLinkBar from '../navlink/navlink'
import Boss from '../boss/boss'
import Genius from '../genius/genius'
import User from '../user/user'
import Msg from '../msg/msg'
import { getMsgList, recvMsg } from '../../redux/chat.redux'

@connect(
  state => state,
  {getMsgList, recvMsg}
)
class Dashboard extends Component {
   
  componentDidMount() {
    if (!this.props.chat.msgs.length) {
      const toUserId = this.props.match.params.user
      this.props.getMsgList(toUserId)
      this.props.recvMsg('dashboard')
    }
  }

  render() {
    const user = this.props.user
    const navList = [
      {
        path: '/boss',
        icon: 'boss',
        title: '牛人列表',
        text: '牛人',
        component: Boss,
        hide: user.type === 'genius' // 针对求职者不应该看到牛人信息，只需要看到招聘信息即可
      },
      {
        path: '/genius',
        icon: 'job',
        title: 'Boss列表',
        text: '职位',
        component: Genius,
        hide: user.type === 'boss'
      },
      {
        path: '/msg',
        text: '消息',
        icon: 'msg',
        title: '消息列表',
        component: Msg
      },
      {
        path: '/me',
        text: '我',
        icon: 'user',
        title: '个人中心',
        component: User
      }
    ]

    const pathname = this.props.location.pathname

    return (
      <div style={{height: '100%', width: '100%', top: 0}}>
        <NavBar className='fixed-header' mode='dark'>{(navList.find(v => v.path === pathname) || {}).title}</NavBar>
        <div style={{marginTop: '45px', marginBottom: '45px'}}>
          <Switch>
            {navList.map(v => (
              <Route key={v.path} path={v.path} component={v.component}></Route>
            ))}
          </Switch>
        </div>
        <NavLinkBar unread={this.props.chat.unread} data={navList}></NavLinkBar>
      </div>
    )
  }

}

export default Dashboard