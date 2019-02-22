import React, { Component } from 'react';
import { List, InputItem, Radio, WingBlank, WhiteSpace, Button } from 'antd-mobile';
import Logo from '../../component/logo/logo';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { register } from '../../redux/user.redux';

@connect(
  state => state.user,
  { register }
)
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 'genius',
      user: '',
      pwd: '',
      repeatpwd: ''
    }
  }

  handleChange(key, value) {
    this.setState({
      [key]: value
    })
  }

  handleRegister() {
    this.props.register(this.state);
    console.log(this.props);
  }

  render() {
    const RadioItem = Radio.RadioItem;
    return (
      <div>
        {this.props.redirectTo ? <Redirect to={this.props.redirectTo}></Redirect> : null}
        <Logo></Logo>
        <WhiteSpace />
        <WhiteSpace />
        {this.props.msg ? <p className="error-msg">{this.props.msg}</p> : null}
        <List>
          <InputItem 
            onChange={e => this.handleChange('user', e)}>
            用户名
          </InputItem>
          <InputItem 
            onChange={e => this.handleChange('pwd', e)}>
            密码
          </InputItem>
          <InputItem 
            onChange={e => this.handleChange('repeatpwd', e)}>
            确认密码
          </InputItem>
          <RadioItem 
            checked={this.state.type==='genius'}
            onChange={() => this.handleChange('type', 'genius')}>
            牛人
          </RadioItem>
          <RadioItem 
            checked={this.state.type==='boss'}
            onChange={() => this.handleChange('type', 'boss')}>
            老板
          </RadioItem>
        </List>
        <WhiteSpace />
        <WhiteSpace />
        <WingBlank>
            <Button type='primary' onClick={() => this.handleRegister()}>注册</Button>
          </WingBlank>
      </div>
    )
  }
}

export default Register;