const db = require('../database/dbConfig')

module.exports = {
    add,
    find
}

function find(username) {
    let query = db('users')
    if (username)
        query = db('users').where({ username }).first()
    return query
}
function add(user) {
    return db('users').insert(user)
}