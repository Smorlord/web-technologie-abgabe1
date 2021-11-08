const express = require('express')
const app = express()

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
    res.render('todo.ejs', {todos});
});

app.post('/add',(req, res) => {
    if(req.body.content != ''){
      todos.push({
        id: nextId,
        content: req.body.content,
      });
      console.log(todos);
      nextId++;
    }
    res.redirect("/");
});

app.get('/remove', (req, res) => {
  todos.forEach(todo => {
    console.log(todo.id);
    if(todo.id == Number(req.query.id)){
      todos.pop(todo);
    }
  })
  res.redirect("/");
});

app.listen(3000, () => {
  console.log("App is listening at http://localhost:3000");
});