import React from 'react'
import { Card, WingBlank, WhiteSpace } from 'antd-mobile'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

@withRouter
class UserCard extends React.Component {

  handleCard(v) {
    this.props.history.push(`/chat/${v._id}`)
  }

  render() {
    return (
      <WingBlank>
          <WhiteSpace />
          {
            this.props.userlist.map(v => (
              v.avatar ? (
                <div key={v._id}>
                  <Card onClick={() => this.handleCard(v)}>
                    <Card.Header 
                      title={v.type === 'boss' ? v.company : v.title}
                      thumb={require(`../img/${v.avatar}.png`)}
                      thumbStyle={{height: '30px'}}
                      extra={v.type==='genius' ? `期望薪资:${v.money}` : `提供薪资:${v.money}`}
                    >
                    </ Card.Header>
                    <Card.Body>
                      {v.desc.split('\n').map((str, index) => (<div style={{marginTop: '5px'}} key={index}>{str}</div>))}
                    </ Card.Body>
                    <Card.Footer
                      content={v.type==='boss' ? null : `最近就职:${v.company}`}
                      extra={v.type === 'boss' ? v.title : v.user}
                    />
                  </Card>
                  <WhiteSpace />
                </div>
              ) : null
            ))
          }
        </WingBlank>
    )
  }
}

export default UserCard

UserCard.propTypes = {
  userlist: PropTypes.array.isRequired
}