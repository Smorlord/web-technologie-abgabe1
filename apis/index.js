var express = require("express");
var mongo = require('./mongo'); 

const todoSchema = require("./schemas/todo-schema")

var app = express();
app.use(express.json());

app.get("/todos", async (req, res) => {
    const getMongoDBTodos = async () => {
        await mongo().then(async (mongoose) => {
            try {
                console.log("Conntected to mongodb locally");
                const result = await todoSchema.find({});
                mongoose.connection.close()
                res.send(JSON.stringify(result));
            } finally {
               console.log("finished");
            }
        })
    }
    getMongoDBTodos();
});

app.post("/add/todo", async (req, res) => {
    const connectToMongoDB = async () => {
        await mongo().then(async (mongoose) => {
            try {
                console.log("Conntected to mongodb locally");
                todo = {
                    id: req.body.id,
                    content: req.body.content
                }
                await new todoSchema(todo).save()
            } finally {
                mongoose.connection.close();
            }
        })
    }
    await connectToMongoDB().then(() => {
        res.sendStatus(200);
    })
});

app.post("/delete/todo", async (req, res) => {
    const connectToMongoDB = async () => {
        await mongo().then(async (mongoose) => {
            try {
                console.log("Conntected to mongodb locally");
                await todoSchema.deleteOne({
                    id: req.body.id
                })
            } finally {
                mongoose.connection.close();
            }
        })
    }
    await connectToMongoDB().then(() => {
        res.sendStatus(200);
    })
});

app.listen(4000, () => {
 console.log("MongoDB API running on http://localhost:4000");
});
