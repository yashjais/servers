// creating package.json file - npm init -y
// installed express - npm install express

const express = require('express')
const fs = require('fs')
const port = 3010
const app = express()

app.use(express.json())

// apphttpMethod(url, callback)

// localhost:3010/
app.get('/', function(req, res) {
    res.send('Welcome to the website')
})

// localhost:3010/users
app.get('/users', function(req, res) {
    // res.json(users)
    fs.readFile('./users.json', 'utf8', function(err, data) {
        if (err){
            console.log(err)
        }else{
            // console.log(data)
            // can also do this - res.send(data) // coz we are parsing and again converting it into JSON
            res.json(JSON.parse(data))
        }
    })
})

// localhost:3010/users/:id
app.get('/users/:id', function(req, res) {
    const id = req.params.id
    fs.readFile('./users.json', 'utf8', function(err, data) {
        if (err){
            console.log(err)
        }else{
            // console.log(data)
            const users = JSON.parse(data)
            const user = users.find(user => user.id == id)
            if(user) {
                res.json(user)
            } else {
                res.json({})
            }
        }
    })
})

app.get('/products', function(req, res) {
    fs.readFile('./products.json', 'utf8', function(err, data) {
        if (err){
            console.log(err)
        }else{
            res.json(JSON.parse(data))
        }
    })
})

app.get('/products/:id', function(req, res) {
    const id = req.params.id
    fs.readFile('./products.json', 'utf8', function(err, data) {
        if (err){
            console.log(err)
        }else{
            const products = JSON.parse(data)
            console.log(products)
            const product = products.find(product => product.id == id)
            if(product) {
                res.json(product)
            } else {
                res.json({})
            }
        }
    })
})

app.post('/users', function(req, res) {
    const id = req.params.id
    const body = req.body
    // console.log('id', id)
    // console.log('body', body)
    fs.readFile('./users.json', 'utf8', function(err, data) {
        if (err){
            console.log(err)
        }else{
            const users = JSON.parse(data)
            users.push(body)
            fs.writeFile('./users.json', JSON.stringify(users), function(err, data) {
                if(err) {
                    console.log(err)
                }else {
                    res.send(body) 
                }
            })
        }
    })
})

app.put('/users/:id', function(req, res) {
    const id = req.params.id
    const body = req.body
    // console.log(id)
    fs.readFile('./users.json', 'utf-8', function(err,data) {
        if(err) {
            console.log(err)
        }else {
            const users = JSON.parse(data)
            const user = users.find(user => user.id == id)
            if(user) {
                Object.assign(user, body)
                fs.writeFile('./users.json', JSON.stringify(users), function(err, data) {
                    if(err) {
                        console.log(err)
                    }else {
                        res.send('success') 
                    }
                })
            }else {
                res.json({})
            }
        }
    })
    // console.log('id', id)
    // console.log('body', body)
    
})

app.delete('/users/:id', function(req, res) {
    const id = req.params.id
    // console.log('id',id)
    fs.readFile('./users.json', 'utf-8', function(err, data) {
        if(err) {
            console.log(err)
        }else {
            const users = JSON.parse(data)
            const index = users.findIndex(user => user.id == id)
            users.splice(index,1)
            fs.writeFile('./users.json', JSON.stringify(users), function(err, data) {
                if(err) {
                    console.log(err)
                } else{
                    res.send('successfully deleted')
                }
            })
        }
    })
})

app.get('/register', function(req, res) {
    res.send('Register With us')
})

app.post('/register', function(req, res) {
    const body = req.body
    fs.readFile('./registered-users.json', 'utf-8', function(err, data) {
        if(err) {
            console.log(err)
        }else {
            const users = JSON.parse(data)
            users.push(body)
            fs.writeFile('./registered-users.json', JSON.stringify(users), function(err, data) {
                if(err) {
                    console.log(err)
                }else {
                    // data is undefined here
                    res.send('successfully registered')
                }
            })
        }
    })
})

app.get('/login', function(req, res) {
    res.send('Login')
})

app.post('/login', function(req, res) {
    const body = req.body
    // console.log(req)
    // console.log(body, typeof body)
    fs.readFile('./registered-users.json', 'utf-8', function(err, data) {
        if(err) {
            console.log(err)
        }else {
            const users = JSON.parse(data)
            const ele = users.find(user => user.email == body.email)
            if(ele && ele.password == body.password ){
                res.send('successfully logged in')
            }else{
                res.send('password or email is wrong')
            }
        }
    })
})

app.listen(port, function(){
    console.log('litening to port', port)
})

