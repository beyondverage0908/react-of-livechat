import React from 'react'
import UserCard from '../userchat/usercard'
import { connect } from 'react-redux'
import { getUserList } from '../../redux/chatuser.redux'

@connect(
  state => state.chatuser,
  { getUserList }
)
class Genius extends React.Component {

  componentDidMount() {
    this.props.getUserList('boss')
  }

  render() {
    return (
      <div>
        <UserCard userlist={this.props.userList}></UserCard>
      </div>
    )   
  }
}

export default Genius