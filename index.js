const express = require('express')
const app = express()

//use static style
app.use("/static", express.static("public"));
//set view engine to ejs
app.set("view engine", "ejs");
//to extract data from the form
app.use(express.urlencoded({ extended: true }));

//routing
app.get('/', (req, res) => {
    res.render('todo.ejs');
});

app.post('/',(req, res) => {
    console.log(req.body);
});

app.listen(3000, () => {
  console.log(`Example app listening at http://localhost:3000`);
});