const bcrypt = require('bcrypt')

let users = {
    users: [
        { id: 1, username: 'warodom', password: '$2b$10$0AsMSQaUB0AlLnKzgeUOfOE.hWUodtuR4NOU954XLVy2gy3lBWsdO', email: 'wwarodom@gmail.com' },
        { id: 2, username: 'john', password: '$2b$10$1Bu4tImM/Ms9rtU.8/n/COWpzUAGFB6YlsO5xZqFih1JUxafyFFXa', email: 'john@gmail.com' },
    ]
}

let tasks = {
    tasks: [
        { id: 1, name: 'KAOYOD', weight : '4500' ,picture:'https://www.mokkalana.com/wp-content/uploads/2019/06/3-23.jpg'},
    { id: 2, name: 'CHUTPETCH', weight : '3500' ,picture:'https://cms.dmpcdn.com/horoscope/2020/03/26/4e818560-6f1c-11ea-b8a2-09037777d4af_original.jpg'},
    { id: 3, name: 'HATAEW', weight : '3500' ,picture:'https://cms.dmpcdn.com/horoscope/2020/03/26/4dddf260-6f1c-11ea-a7cd-dd316e61efc7_original.jpg'}
    ]
}

const SECRET = 'your_jwt_secret'
const NOT_FOUND = -1

exports.users = users
exports.tasks = tasks
 
exports.SECRET = SECRET
exports.NOT_FOUND = NOT_FOUND

exports.setUsers = function(_users) { 
  users = _users;
}

exports.setTasks = function(_tasks) { 
    tasks = _tasks;
  }

// === validate username/password ===
exports.isValidUser = async (username, password) => { 
    const index = users.users.findIndex(item => item.username === username) 
    return await bcrypt.compare(password, users.users[index].password)
}

// return -1 if user is not existing
exports.checkExistingUser = (username) => {
    return users.users.findIndex(item => item.username === username)
}