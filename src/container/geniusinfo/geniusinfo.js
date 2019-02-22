import React, { Component } from 'react'
import { NavBar, InputItem, TextareaItem, Button, WhiteSpace } from 'antd-mobile'
import AvatarSelector from '../../component/avatar-selector/avatar-selector'
import { connect } from 'react-redux'
import { update } from '../../redux/user.redux'
import { Redirect } from 'react-router-dom'

@connect(
  state => state.user,
  {update}
)
class GeniusInfo extends Component {

  constructor(props) {
    super(props)
    this.state = {
      title: '',
      money: '',
      desc: '',
      avatar: ''
    }
  }

  handleChange(key, v) {
    this.setState({
      [key]: v
    })
  }
 
  handleSelectAvatar(imageName) {
    this.setState({
      avatar: imageName
    })
  }

  render() {
    const currentPath = this.props.location.pathname
    const redirect = this.props.redirectTo
    return (
      <div>
        {redirect && redirect !== currentPath ? <Redirect to={this.props.redirectTo}></Redirect> : null}
        <NavBar mode="dark">牛人完善信息</NavBar>
        <AvatarSelector selectAvatar={this.handleSelectAvatar.bind(this)}></AvatarSelector>
        <InputItem 
          placeholder="求职岗位"
          onChange={(v => this.handleChange('title', v))}>
          求职岗位
        </InputItem>
        <InputItem
          placeholder="期待薪资"
          onChange={(v => this.handleChange('money', v))}>
          期待薪资
        </InputItem>
        <TextareaItem
          title="个人见解"
          autoHeight
          placeholder="个人见解"
          onChange={v => this.handleChange('desc', v)} />
        <WhiteSpace />
        <Button 
          style={{borderRadius: "0px"}} 
          type="primary"
          onClick={() => {this.props.update(this.state)}}>
          保存
        </Button>
      </div>
    )
  }
}

export default GeniusInfo

