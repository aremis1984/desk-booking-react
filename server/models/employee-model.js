const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Employee = new Schema(
    {
        firstname: { type: String, required: true },
        surname: { type: String, required: true },
        key: { type: String, required: true }
    },
    { timestamps: true },
)

module.exports = mongoose.model('employees', Employee)