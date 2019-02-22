import React from 'react'
import { sendMsg, getMsgList, recvMsg, readMsg } from '../../redux/chat.redux'
import { connect } from 'react-redux'
import { getChatId } from '../../util'
import { List, InputItem, NavBar, Icon, Toast, Grid } from 'antd-mobile'

@connect(
  state => state,
  { sendMsg, getMsgList, recvMsg, readMsg }
)
class Chat extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      text: '',
      isShowEmoji: false
    }
  }

  componentDidMount() {
    if (!this.props.chat.msgs.length) {
      this.props.getMsgList()
      this.props.recvMsg('chat')
    }
  }

  componentWillUnmount() {
    console.log('unmount')
    // 退出的时候，设置对方发给我的消息都为已读
    let fromUserId = this.props.match.params.user
    this.props.readMsg({from: fromUserId})
  }

  handleChange(v) {
    this.setState({
      text: v
    })
  }

  handleSubmit() {
    this.sendMsg()
  }

  handleKeyPress(e) {
    let code = e.which || e.keyCode
    if (code === 13) {
      this.sendMsg()
    }
  }

  sendMsg() {
    const from = this.props.user._id
    const to = this.props.match.params.user
    const msg = this.state.text
    if (!msg) {
      Toast.info('信息不能为空', 1, null, false);
      return;
    }
    this.props.sendMsg({from, to, msg})
    
    this.setState({text: ''})
  }

  handleEmoji(el, idx) {
    this.setState({
      text: this.state.text + el['text']
    })
  }

  handleSwitchEmoji() {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'))
    }, 0)
    this.setState({
      isShowEmoji: !this.state.isShowEmoji
    })
  }

  render() {
    const targetId = this.props.match.params.user
    if (!this.props.chat.msgs || !this.props.chat.msgs.length) {
      return null
    }
    const msgs = this.props.chat.msgs.filter(v => v.chatid === getChatId(this.props.user._id, targetId))
    const users = this.props.chat.users
    const Item = List.Item

    const emoji = '😀 😁 😂 🤣 😃 😄 😅 😆 😉 😊 😋 😎 😍 😘 🥰 😗 😙 😚 🙂 🤗 🤩 🤔 🤨 😐 😑 😶 🙄 😏 😣 😥 😮 🤐 😯 😪 😫 😴 😌 😛 😜 😝 🤤 😒 😓 😔 😕 🙃 🤑 😲 ☹️ 🙁 😖 😞 😟 😤 😢 😭 😦 😧 😨 😩 🤯 😬 😰 😱 🥵 🥶 😳 🤪 😵 😡 😠 🤬 😷 🤒 🤕 🤢 🤮 🤧 😇 🤠 🤡 🥳 🥴 🥺 🤥 🤫 🤭 🧐 🤓 😈 👿 👹 👺 💀 👻 👽 🤖 💩 😺 😸 😹 😻 😼 😽 🙀 😿 😾'
                  .split(' ')
                  .filter(v => v)
                  .map(v => ({'text': v}))

    if (!users || !users[targetId]) {
      return null
    }
    return (
      <div id="chat-page">
        <NavBar
          className="fixed-header" 
          mode="dark"
          icon={<Icon type="left"></Icon>}
          onLeftClick={() => {
            this.props.history.goBack()
          }}>
          {this.props.chat.users ? this.props.chat.users[targetId].user : ""}
        </NavBar>
        <div id="msg-content-body-id" style={{marginTop: "45px", marginBottom: "45px"}}>
          {msgs && users ? msgs.map(v => {
            return v.from === targetId ? (
              <List key={v._id}>
                <Item
                  multipleLine={true}
                  wrap={true}
                  thumb={require(`../img/${users[targetId].avatar}.png`)}
                >{v.content}</Item>
              </List>  
            ) : (
              <List key={v._id}>
                <Item
                  wrap={true}
                  multipleLine={true}
                  extra={<img src={require(`../img/${users[v.from].avatar}.png`)} alt=""/>}
                  className="chat-me"
                >{v.content}</Item>
              </List>
            )
          }) : null}
        </div>
        <div className="stick-footer">
          <List>
            <InputItem
              placeholder='请输入'
              value={this.state.text}
              onChange={v => this.handleChange(v)}
              extra={
                <div>
                  <span onClick={() => this.handleSwitchEmoji()}>{this.state.isShowEmoji ? '键盘' : '表情'}</span>&nbsp;
                  <span style={{ color: '#3eb94e'}} onClick={() => this.handleSubmit()}>发送</span>
                </div>
              }
              onKeyPress={(e) => this.handleKeyPress(e)}
            >信息</InputItem>
          </List>

          {this.state.isShowEmoji ? <Grid 
            data={emoji}
            columnNum={9}
            carouselMaxRow={4}
            isCarousel={true}
            onClick={(el, idx) => this.handleEmoji(el, idx)}
          /> : null}
        </div>
      </div>
    )
  }
}

export default Chat