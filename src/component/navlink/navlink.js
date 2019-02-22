import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { TabBar } from 'antd-mobile'

// withRouter的作用，作为非路由组件，需要通过这个关键字，将路由信息注入到this.props中，之后才能从this.props中获取路由信息
@withRouter 
class NavLinkBar extends Component {

  handePinTab(path) {
    this.props.history.push(path)
  }

  render() {
    const navList = this.props.data.filter(v => !v.hide)
    const pathname = this.props.location.pathname
    return (
      <div>
        <TabBar>
          {
            navList.map(v => (
              <TabBar.Item
                badge={v.path === '/msg' ? this.props.unread : null}
                key={v.text}
                title={v.text}
                icon={{uri: require(`../img/tabbar/${v.icon}.png`)}}
                selected={v.path === pathname}
                selectedIcon={{uri: require(`../img/tabbar/${v.icon}-active.png`)}}
                onPress={() => this.handePinTab(v.path)}
              >
              </TabBar.Item>
            ))
          }
        </TabBar>
      </div>
    )
  }
}

export default NavLinkBar

NavLinkBar.propTypes = {
  data: PropTypes.array.isRequired
}

