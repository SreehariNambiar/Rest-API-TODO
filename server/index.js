const express = require('express')
const app = express()
const cors = require('cors')
app.use(express.json()) //to get req.body
app.use(cors()) //to establish or send request between front and back
const pool = require('./db')

app.use('/auth', require('./routes/jwtAuth'))

app.use('/dashboard', require('./routes/dashboard'))

app.listen(3002, ()=>{
    console.log('listening to 3002')
})