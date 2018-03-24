const express = require('express')
const bodyParser = require('body-parser')

const config = require('./config')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// moq
let artists = [
    {
        id: 1,
        name: 'name1'
    },
    {
        id: 2,
        name: 'name2'
    },
    {
        id: 3,
        name: 'name3'
    }
]

app.get('/', (req, res) => {
    res.send('api')
})

app.get('/artists', (req, res) => {
    res.send(artists)
})

app.get('/artists/:id', (req, res) => {
    const artist = artists.find(artist => artist.id === Number(req.params.id))
    
    res.send(artist)
})

app.post('/artists', (req, res) => {
    const artist = {
        id: Date.now(),
        name: req.body.name
    }

    artists.push(artist)

    res.send(artist)
})

app.put('/artists/:id', (req, res) => {
    const artist = artists.find(artist => artist.id === Number(req.params.id))
    
    artist.name = req.body.name

    res.sendStatus(200)
})

app.delete('/artists/:id', (req, res) => {
    artists = artists.filter(artist => artist.id !== Number(req.params.id))

    res.sendStatus(200)
})

app.listen(config.port, () => {
    console.log('api started')
})