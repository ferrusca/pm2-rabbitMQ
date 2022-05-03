const fetch = require('node-fetch');
// import fetch from 'node-fetch'


class CommentsApi {
    constructor() {};
    
    fetchComments() {
        return fetch('https://jsonplaceholder.typicode.com/comments')
    }
}

module.exports = new CommentsApi();