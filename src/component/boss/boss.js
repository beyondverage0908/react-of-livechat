import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getUserList } from '../../redux/chatuser.redux'
import UserCard from '../userchat/usercard'

@connect(
  state => state.chatuser,
  { getUserList }
)
class Boss extends Component {

  constructor(props) {
    super(props)
    this.state = {
      userList: []
    }
  }

  componentDidMount() {
    this.props.getUserList('genius')
  }

  render() {
    return (
      <div>
        <UserCard userlist={this.props.userList}></UserCard>
      </div>
    )
  }
}

export default Boss