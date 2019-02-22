import React, { Component } from 'react';
import { Button, WhiteSpace, WingBlank } from 'antd-mobile';
import { connect } from 'react-redux';
import { addGun, removeGun, asyncAddGun } from './index.redux';
import axios from 'axios';

// 将state信息转换到props中
// const mapStateToProps = (state, ownProps) => {
//   return {
//     num: state
//   }
// }
// const actionCreators = {addGun, removeGun, asyncAddGun}
// App = connect(mapStateToProps, actionCreators)(App);

@connect(
  (state) => ({num: state}), 
  { addGun, removeGun, asyncAddGun }
)
class App extends Component {

  getUserInfo() {
    console.log('get user info');
    axios.get('/person').then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    })
  }

  render() {
    return (
      <div className="App">
        <WingBlank>
          <p>{this.props.num}</p>
          <Button type="primary" onClick={this.props.addGun}>增加</Button><WhiteSpace />
          <Button type="primary" onClick={this.props.removeGun}>减少</Button><WhiteSpace />
          <Button type="primary" onClick={this.props.asyncAddGun}>两秒后添加</Button><WhiteSpace />
          <Button type="primary" onClick={() => {this.getUserInfo()}}>获取数据个人信息</Button><WhiteSpace />
        </WingBlank>
      </div>
    );
  }
}

export default App;
