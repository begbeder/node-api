const express = require('express')
const bodyParser = require('body-parser')

const db = require('./db')

const artistsController = require('./controllers/artists')

const config = require('./config')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.send('api')
})

app.get('/artists', artistsController.all)

app.get('/artists/:id', artistsController.findById)

app.post('/artists', artistsController.create)

app.put('/artists/:id', artistsController.update)

app.delete('/artists/:id', artistsController.delete)

db.connect('mongodb://localhost/myapi', (err) => {
    if (err) {
        return console.log(err) 
    }

    app.listen(config.port, () => {
        console.log('api started')
    })
})