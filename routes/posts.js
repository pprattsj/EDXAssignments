
//POSTS

//V
module.exports.getPost = (req, res) =>{
   let postId = req.params.id
   var store = req.app.get('store')
   let thisPost = JSON.stringify(store.posts[postId])
   res.send(thisPost);   
  },

//V
module.exports.addPost=(req, res) =>{  //POst
  let newText = req.body
  var store = req.app.get('store')
  store.posts.push(JSON.parse(newText))
  let id = store.posts.length
  res.status(201).send({id: id})
   
  },

//V
module.exports.updatePost=(req, res) =>{  //PUT
   console.log('update a Post');
   let newText = req.body
   let postId = req.params.id
   var store = req.app.get('store')
   store.posts[postId] = JSON.parse(newText)
   res.status(204).send(store.posts[postId])
   
  },

//V
module.exports.removePost=(req, res) =>{
   let postId = req.params.id
   var store = req.app.get('store')
   let maxId = store.posts.length
   delete store.posts[postId]
   store.posts.splice(postId,1)
   let id = store.posts.length
   res.status(204).send({id: id});
   
  },

// COMMENTS


//V
module.exports.addComment=(req,res)=>{
   console.log("Add Comment")
   let newText = req.body
   let postId = req.params.id
   let store = req.app.get('store')
   let name = store.posts[postId].name
   store.posts[postId].comments.push(JSON.parse(newText))
   let textLen = store.posts[postId].comments.length
   console.log( JSON.stringify(newText))
   res.status(201).send( name + " : Text count = " + textLen)

  } 

//V
module.exports.getComments=(req,res)=>{
   console.log("get all Comments")
   let postId = req.params.id
   let store = req.app.get('store')
   let post= store.posts[postId]
   let name = post.name
   let message = "{\"name\": \'" + name +"\',"
   let comments = post.comments
   message = message + "\"comments\": "+ JSON.stringify(comments) +"}"
   console.log( message)
   res.send( message )
  }

//V
module.exports.getComment=(req,res)=>{
   console.log("get a single Comment")
   let postId = req.params.id
   let cmmId = req.params.commentId
   let store = req.app.get('store')
   let post= store.posts[postId]
   let name = post.name
   let message = "{\"name\": \'" + name +"\',"
   let comments = post.comments[cmmId]
   message = message + "\"comments\": "+ JSON.stringify(comments) +"}"
   console.log( message)
   res.send( message )
  },

//N
module.exports.updateComment=(req,res)=>{
   console.log("update Comment")
   let newText = req.body
   let postId = req.params.id
   let cmmId = req.params.commentId
   let store = req.app.get('store')
   let post= store.posts[postId]
   let name = post.name
   post.comments[cmmId]= JSON.parse(newText)
   let textLen = post.comments.length
   console.log( JSON.stringify(newText))
   res.send( name + " : Text count = " + textLen)

  },

//V 
module.exports.removeComment=(req,res)=>{
   console.log("remove Comment")
   let postId = req.params.id
   let cmmId =  req.params.commentId
   let store = req.app.get('store')
   let post= store.posts[postId]
   let name = post.name
   let comment =  post.comments[cmmId]
   delete store.posts[postId].comments[cmmId]
   let textLen = store.posts[postId].comments.length
   res.send( name + " : Text count = " + textLen)

  }