const express = require('express')
const bodyParser = require('body-parser')

const ObjectID = require('mongodb').ObjectID
const db = require('./db')

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
    db.get().collection('artists').find().toArray((err, docs) => {
        if (err) {
            console.log(err)
            return res.sendStatus(500)
        }

        res.send(docs)
    })
})

app.get('/artists/:id', (req, res) => {
    const artist = artists.find(artist => artist.id === Number(req.params.id))
    db.get().collection('artists').findOne({ _id: ObjectID(req.params.id) }, (err, doc) => {
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

    db.get().collection('artists').insert(artist, (err, result) => {
        if (err) {
            console.log(err)
            return res.sendStatus(500)
        }

        res.send(artist)
    })
})

app.put('/artists/:id', (req, res) => {
    db.get().collection('artists').update(
        { _id: ObjectID(req.params.id) },
        { name: req.body.name },
        (err, result) => {
            if (err) {
                console.log(err)
                return res.sendStatus(500)
            }

            res.sendStatus(200)
        }
    )
})

app.delete('/artists/:id', (req, res) => {
    db.get().collection('artists').deleteOne(
        { _id: ObjectID(req.params.id) },
        (err, result) => {
            if (err) {
                console.log(err)
                return res.sendStatus(500)
            }

            res.sendStatus(200)
        }
    )
})

db.connect('mongodb://localhost/myapi', (err) => {
    if (err) {
        return console.log(err) 
    }

    app.listen(config.port, () => {
        console.log('api started')
    })
})