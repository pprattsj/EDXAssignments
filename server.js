//BLOG

// IMPORTS

const express = require('express')
const routes = require('./routes/posts.js')
const https = require('https')
const logger = require('morgan')
const errorhandler = require('errorhandler')
const bodyParser = require('body-parser')
// INSTANTIATION
let app = express()
const getPost =       routes.getPost
const addPost =       routes.addPost
const removePost =    routes.removePost
const updatePost =    routes.updatePost
const getComments =   routes.getComments
const getComment =    routes.getComment
const addComment =    routes.addComment
const removeComment = routes.removeComment
const updateComment = routes.updateComment
//let getPosts = routes.getPosts

//CONFIGURATIONS
var store = {
  "posts": [
    {"name": 'Top 10 ES6 Features every Web Developer must know',
    "url": 'https://webapplog.com/es6',
    "text": 'This essay will give you a quick introduction to ES6. If you don’t know what is ES6, it’s a new JavaScript implementation.',
    "comments": [ 
       {"Text": 'Cruel…..var { house, mouse} = No type optimization at all'},
       {"Text": 'I think you’re undervaluing the benefit of ‘let’ and ‘const’.'},
       {"Text": '(p1,p2)=>{ … } ,i understand this ,thank you !'}
    ]
    }
  ]
};

app.set('store',store)

//let store = 'hello Blog'

//MIDDLEWARES



app.use(bodyParser.text({type: "application/json"}))
app.use(logger('dev'))
app.use(errorhandler())


//ROUTES

/// General BLOG

app.get('/blog', (req, res)=>{
  let store = req.app.get('store')
  res.send(store)
})

app.get('/blog-count', (req, res)=>{
  let store = req.app.get('store')
  res.send("count=" + store.posts.length)
})

///POSTS

app.get('/posts/:id', getPost);

app.delete('/posts/:id', removePost);

app.post('/posts', addPost);

app.put('/posts/:id', updatePost);

///COMMENTS

app.get('/comments/:id', getComments);

app.get('/comments/:id/:commentId', getComment);

app.post('/comments/:id', addComment);

app.delete('/comments/:id/:commentId', removeComment);

app.put('/comments/:id/:commentId', updateComment);

/// ALL ELSE
app.all('*', (req, res)=> {
  res.status(402).send('Blog Assignment')
})


//ERROR HANDLERS

//BOOTUP
app.listen(3000)


// 