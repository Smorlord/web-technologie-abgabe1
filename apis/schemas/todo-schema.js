const mongoose = require("mongoose")

const todoSchema = mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("todos", todoSchema)