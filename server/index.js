const express = require('express')
const bodyParser = require('body-parser')
const compression = require('compression')
const cors = require('cors')
const helmet = require('helmet')
const employeeRouter = require('./routes/employee-router')
const desksRouter = require('./routes/desks-router')

const app = express()
const apiPort = 8080

app.use(cors())
app.use(helmet())
app.use(compression())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api', employeeRouter, desksRouter)

// Implement 500 error route
app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something is broken.' + err.stack)
})

// Implement 404 error route
app.use(function (req, res, next) {
    res.status(404).send('Sorry we could not find that.')
})

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))