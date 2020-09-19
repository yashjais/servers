// common js module loaders

const http = require('http')
const port = 3010
const server = http.createServer(function(request, response){ 
    if(request.url == '/') {
        response.end('welcome to the website')
    } else if(request.url == '/users') {
        const users = [
            {id: 1, name: 'jack'},
            {id: 2, name: 'phil'}
        ]
        response.end(JSON.stringify(users))
    } else if(request.url == '/products') {
        const products = [
            {id: 1, name: 'pencil'},
            {id: 2, name: 'pen'}
        ]
        response.end(JSON.stringify(products))
    }else{
        response.end('the page you are looking for doesn\'t exist')
    }
})

server.listen(port, () => {
    console.log('listening port', port)
})

