const express = require('express');
const app = express();
const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient

var db
var uri = 'mongodb://vasu:Bebble-1234@ds251622.mlab.com:51622/charlottedb';
var query;

MongoClient.connect(uri, (err, database) => {
  if (err) return console.log(err)
  db = database.db('charlottedb') // whatever your database name is
  app.listen(process.env.PORT || 5000, () => {
    console.log('listening on 5000')
  })
}) 



app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
  // Note: __dirname is directory that contains the JavaScript source code. Try logging it and see what you get!
  // Mine was '/Users/zellwk/Projects/demo-repos/crud-express-mongo' for this app.

})

app.get('/addOne', (req, res) => {
  res.render("add.ejs",{User:{}})
  // Note: __dirname is directory that contains the JavaScript source code. Try logging it and see what you get!
  // Mine was '/Users/zellwk/Projects/demo-repos/crud-express-mongo' for this app.

})





app.get('/showUser', (req, res) => {
 db.collection('Users').find().toArray((err, result) => {
    if (err) return console.log(err)
    // renders index.ejs
    res.render('index.ejs', {Users: result})
  })
})

app.post('/addUser', (req, res) => {
 db.collection('Users').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
    res.redirect('/showUser')
  })
})







// Delete------
app.get('/deleteOne', (req, res) => {
  res.render('delete.ejs', {User:{}})
})

app.post('/deleteUser',(req,res)=>{

 query = req.body;
 res.redirect('/Delete')

  })


app.get('/Delete', (req, res) => {
 db.collection('Users').deleteOne(query,function(err,result) {
 	if (err) throw err;
    res.redirect('/showUser')
  
  })

})







//Search ---- 

app.get('/searchOne', (req, res) => {
  res.render('search.ejs', {User:{}})
})


app.post('/searchUser',(req,res)=>{

 query = req.body;
 res.redirect('/SearchOutput')

  })


app.get('/SearchOutput', (req, res) => {
 db.collection('Users').find(query).toArray((err, result) => {
    if (err) return console.log(err)
    // renders index.ejs
    res.render('search.ejs', {User: result})
  })
})
