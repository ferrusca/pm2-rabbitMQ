const fetch = require('node-fetch');

class UsersApi {
    constructor() {};
    
    fetchUsers() {
        return fetch('https://jsonplaceholder.typicode.com/users')
    }
}

module.exports = new UsersApi();