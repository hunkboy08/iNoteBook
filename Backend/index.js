const express = require('express')
const app = express()
const connectToMongo = require('./db')
require('dotenv').config();
const cors = require('cors');
const port = process.env.PORT;
app.use(cors()); 
app.use(express.json())
// call connectToMongo function
connectToMongo();

app.get('/', (req, res) => {
    res.send('Hello World!')
})

// Available Routes
app.get('/', (req, res) => {
    res.send("Hello world")
})
app.use('/api/auth', require('./routes/auth'))

app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
    console.log(`iNoteBook Backend App listening on port`)
})