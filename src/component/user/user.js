import React from 'react'
import { Result, List, WhiteSpace, Button, Modal } from 'antd-mobile'
import { connect } from 'react-redux'
import { logout } from '../../redux/user.redux'
import { Redirect } from 'react-router-dom'
import Cookies from 'js-cookie'

@connect(
  state => state.user,
  { logout }
)
class User extends React.Component {

  handleExitApp() {
    const alert = Modal.alert
    alert('提示', '确认退出app', [
      {text: '取消', onPress: () => {}},
      {text: '确认', onPress: () => {
        Cookies.remove('userid')
        this.props.logout()
      }}
    ])
  }

  render() {
    const ciwei = 'ciwei'
    const Item = List.Item
    return (
      <div>
        {this.props.user ? null : <Redirect to={this.props.redirectTo}/>}
        <Result
          img={ <img src={require(`../img/${this.props.avatar || ciwei}.png`)} width="60" alt=""/>}
          title={this.props.user}
          message={this.props.type === 'boss' ? `职位: ${this.props.title}` : `期待薪资: ${this.props.money}`}
        />
        <WhiteSpace />
        <List>
          <Item extra={this.props.company}>公司</Item>
          <Item wrap>
            {this.props.type==='boss' ? '招聘要求：' : '个人简介：'}
            {(this.props.desc || '').split('\n').map((v, idx) => {
              return <div key={idx}>{v}</div>
            })}
          </Item>
        </List>
        <WhiteSpace />
        <Button onClick={() => this.handleExitApp()}>退出程序</Button>
      </div>
    )
  }
}

export default User