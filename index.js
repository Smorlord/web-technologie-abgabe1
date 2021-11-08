const express = require('express')
const axios = require('axios');
const { response } = require('express');
const app = express()
const crypto = require("crypto");

//todo array
var todos = [];
var nextId = 0;

//use static style
app.use("/static", express.static("public"));
//set view engine to ejs
app.set("view engine", "ejs");
//to extract data from the form
app.use(express.urlencoded({ extended: true }));

//routing
app.get('/', (req, res) => {
    axios.get("http://localhost:4000/todos")
    .then(response => {
      todos = response.data;
      res.render('todo.ejs', {todos});
    })
    .catch(error => {
      console.log(error);
      res.render('todo.ejs', {todos});
    })
});

app.post('/add', async (req, res) => {
    if(req.body.content != ''){
      todoId = crypto.randomBytes(16).toString("hex");
      newTodo = {
        id: todoId,
        content: req.body.content
      }
      nextId++;

      const jsonData = JSON.stringify(newTodo);
      const responseTest = await axios.post('http://localhost:4000/add/todo', jsonData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
    res.redirect("/");
});

app.get('/remove', async (req, res) => {
  const jsonData = JSON.stringify({
    id: req.query.id
  })

  const requestDelete = await axios.post('http://localhost:4000/delete/todo', jsonData, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  
  res.redirect("/");
});

app.listen(3000, () => {
  console.log("App is listening at http://localhost:3000");
});