// model用于操纵mongo数据库

// mongodb
const mongoose = require('mongoose');
const DB_URL = 'mongodb://127.0.0.1:27017/imooclivechat';
mongoose.connect(DB_URL, {useNewUrlParser: true});

const models = {
    user: {
        'user': {type: String, require: true},
        'pwd': {type: String, require: true},
        'type': {type: String, require: true},
        'avatar': {'type': String},
        'desc': {'type': String}, // 个人简介或者职位简介
        'title': {'type': String}, // 职位名
        'company': {'type': String},
        'money': {'type': String}
    },
    chat: {
        'chatid': {type: String, require: true},
        'from': {type: String, require: true},
        'to': {type: String, require: true},
        'read': {type: Boolean, default: false},
        'content': {type: String, require: true},
        'create_time': {type: String, default: new Date().getTime()}
    }
}

for (let m in models) {
    mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
    getModel: function(name) {
        return mongoose.model(name)
    }
}

mongoose.connection.on('connected', function() {
    console.log('mongo connected success');
})