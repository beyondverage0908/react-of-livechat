import React, { Component } from 'react'
import { Grid } from 'antd-mobile'
import PropTypes from 'prop-types'

export default class AvatarSelector extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedHead: ''
    }
  }

  render() {
    const avatarList = 'ciwei,daxiang,gongji,hema,huhou,huli,jingyu,kaola,lang,lu,maotouying,nainiu,pangxie,xiaoji'
      .split(',').map(item => ({
        icon: require(`../img/${item}.png`),
        text: item
      }))

    return (
      <div>
        <div>
          {this.state.selectedHead ? '已选择头像' : '选择头像'}
          <img style={{width: 20}} src={this.state.selectedHead} alt=""/>
        </div>
        <Grid 
          data={avatarList} 
          columnNum={4} 
          onClick={(avatar) => {
              this.setState({
                selectedHead: avatar.icon
              })
              this.props.selectAvatar(avatar.text)
            }
          } />
      </div>
    )
  }
}

AvatarSelector.propTypes = {
  selectAvatar: PropTypes.func.isRequired
}