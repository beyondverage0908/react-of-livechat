import React, { Component } from 'react';
import Logo from '../../component/logo/logo';
import { List, InputItem, WingBlank, Button, WhiteSpace } from 'antd-mobile';
import { login } from '../../redux/user.redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

@connect(
  state => state.user,
  {login}
)
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pwd: '',
      user: ''
    }
    this.register = this.register.bind(this);
  }

  register() {
    this.props.history.push('/register');
  }

  handleLogin() {
    this.props.login(this.state)
    setTimeout(() => {
      console.log(this.props)
    }, 2000)
  }

  handleChange(key, value) {
    this.setState({
      [key]: value
    })
  }

  render() {
    return (
        <div>
            <Logo />
            {this.props.redirectTo && this.props.redirectTo !== '/login' ? <Redirect to={this.props.redirectTo}></Redirect> : null}
            <WhiteSpace />
            <WhiteSpace />
            {this.props.msg ? <p className="error-msg">{this.props.msg}</p> : null}
            <WingBlank>
              <List>
                <InputItem 
                  onChange={e => this.handleChange('user', e)}
                >用户</InputItem>
                <InputItem
                  onChange={e => this.handleChange('pwd', e)}
                >密码</InputItem>
              </List>
              <WhiteSpace />
              <WhiteSpace />
              <WhiteSpace />
              <Button type='primary' onClick={this.handleLogin.bind(this)}>登录</Button>
              <WhiteSpace />
              <Button type='primary' onClick={this.register}>注册</Button>
            </WingBlank>
        </div>
    )
  }
}

export default Login;