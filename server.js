const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID

const config = require('./config')

const app = express()

let db = null

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
    db.collection('artists').find().toArray((err, docs) => {
        if (err) {
            console.log(err)
            return res.sendStatus(500)
        }

        res.send(docs)
    })
})

app.get('/artists/:id', (req, res) => {
    const artist = artists.find(artist => artist.id === Number(req.params.id))
    db.collection('artists').findOne({ _id: ObjectID(req.params.id) }, (err, doc) => {
        if (err) {
            console.log(err)
            return res.sendStatus(500)
        }

        res.send(doc)
    })
})

app.post('/artists', (req, res) => {
    const artist = {
        name: req.body.name
    }

    db.collection('artists').insert(artist, (err, result) => {
        if (err) {
            console.log(err)
            return res.sendStatus(500)
        }

        res.send(artist)
    })
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

MongoClient.connect('mongodb://localhost/myapi', (err, database) => {
    if (err) {
        return console.log(err) 
    }

    db = database.db('myapi');

    app.listen(config.port, () => {
        console.log('api started')
    })
})