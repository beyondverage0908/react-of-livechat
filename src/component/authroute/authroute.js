import { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import { loadData } from '../../redux/user.redux'

// 主要用户当前用户状态的判断
@withRouter
@connect(
	null,
	{ loadData }
)
class AuthRoute extends Component {
	
	// 1. 是否登录
	// 2. 当前的URL地址，login不需要跳转
	// 3. 用户的type 身份为genius，boss
	// 4. 用户是否完善个人信息
	componentDidMount() {
		// 当前的路由在登录页或者注册页，则无需跳转
		let publicPaths = ['/login', '/register']
		let pathname = this.props.location.pathname
		if (publicPaths.indexOf(pathname) > -1) return null

		axios.get('/user/info').then(res => {
			if (res.status === 200) {
				if (res.data.code === 0) {
					// 有登录的信息
					let {...result} = {...res.data.data, msg: '获取信息成功'}
					this.props.loadData(result)
				} else {
					this.props.history.push('/login');
				}
			}
		}).catch(err => {

		});
	}

	render() {
		return null
	}

}

export default AuthRoute;