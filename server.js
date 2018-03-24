const express = require('express')

const config = require('./config')

const app = express()

// moq
const artists = [
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

app.listen(config.port, () => {
    console.log('api started')
})