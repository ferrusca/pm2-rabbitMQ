const fetch = require('node-fetch');

class PostsApi {
    constructor() {};
    
    fetchPosts() {
        return fetch('https://jsonplaceholder.typicode.com/posts')
    }
}

module.exports = new PostsApi();