const express = require('express')
const utils = require('utility');
const Router = express.Router()
const model = require('./model')
const User = model.getModel('user')
const Chat = model.getModel('chat')
const _filter = {'pwd': 0, '__v': 0}

Router.post('/readmsg', function(req, res) {
    const userid = req.cookies.userid
    const fromUserId = req.body['from']
    Chat.update(
        {from: fromUserId, to: userid},
        {'$set': {read: true}},
        {'multi': true},
        function(err, doc) {
            if (err) {
                return res.json({code: 1, msg: '更新消息已读未读出错'})
            }
            return res.json({code: 0, msg: '更新消息状态成功', num: doc.nModified})
        }
    )
    console.log(req.body)
    console.log(userid, fromUserId)
})

Router.get('/msglist', function(req, res) {
    const userid = req.cookies.userid
    User.find({}, function(err, doc) {
        if (err) {
            return res.json({code: 1, msg: '获取用户信息失败'})
        }
        let users = {}
        doc.forEach(v => {
            users[v._id] = {user: v.user, avatar: v.avatar}
        })
        // 获取聊天信息
        Chat.find({'$or': [{from: userid}, {to: userid}]}, function(err, doc) {
            if (err) {
                return res.json({code: 1, msg: '获取信息列表数据库错误'})
            }
            return res.json({code: 0, msg: '获取信息成功', msgs: doc, users: users})
        })
    })
})

Router.get('/remove', function(req, res) {
    const {user} = req.query
    User.remove({user}, function(err, doc) {
        if (err) {
            return res.json({code: 1, msg: '用户删除失败'})
        }
        return res.json({code: 0, msg: '删除成功', data: doc})
    })
})

// 获取用户列表
Router.get('/list', function(req, res) {
    // User.remove({}, function(err, doc) {})
    const {type} = req.query
    let queryBody = {}
    queryBody['type'] = type
    if (type === 'all') {
        queryBody = {}
    }
    User.find(queryBody, function(err, doc) {
        if (err) {
            return res.json({code: 1, msg: '获取信息'})
        }
        return res.json({code: 0, msg: '获取列表信息成功', data: doc})
    })
})

Router.post('/register', function(req, res) {
    const {user, pwd, type} = req.body;
    User.find({user: user}, function(err, doc) {
        if (doc.length) {
            return res.json({code: 1, msg: '用户名重复'});
        }
        const userModel = new User({user, pwd: solt(pwd), type})
        userModel.save(function(err, doc) {
            if (err) {
                return res.json({code: 1, msg: '创建失败，后端出错了'})
            }
            const {user, type, _id} = doc
            res.cookie('userid', _id)
            return res.json({code: 0, msg: '注册成功了', data: {user, type, _id}})
        });
    })
})

Router.post('/login', function(req, res) {
    const {user, pwd} = req.body;
    User.findOne({user, pwd: solt(pwd)}, _filter, function(err, doc) {
        if (!doc) {
            return res.json({code: 1, msg: '帐号或者密码不正确'});
        }
        res.cookie('userid', doc._id);
        return res.json({code: 0, msg: '登录成功', data: doc});
    })
})

Router.get('/info', function(req, res) {
    // 使用cookie进行用户身份校验
    const {userid} = req.cookies;
    if (!userid) {
        return res.json({code: 1})
    }
    User.findOne({_id: userid}, _filter, function(err, doc) {
        if (err) {
            return res.json({code: 1, msg: '后端出错了'})
        }
        if (doc) {
            return res.json({code: 0, data: doc, msg: '获取信息成功'})
        }
    });
})

Router.post('/update', function(req, res) {
    const {userid} = req.cookies
    const body = req.body 
    User.findByIdAndUpdate(userid, body, function(err, doc) {
        if (err) {
            return res.json({code: 1, msg: '更新失败'})
        }
        const data = Object.assign({}, {
            user: doc.user,
            type: doc.type
        }, body)
        return res.json({code: 0, msg: '更新成功', data: data})
    })
})

// 密码加盐 - 防止常用的md5加密后的彩虹表对照
function solt(pwd) {
    let solt = 'vhs_health_ssh_%&^%$!%';
    return utils.md5(utils.md5(pwd + solt))
}

module.exports = Router