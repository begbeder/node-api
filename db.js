const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID

const state = {
    db: null
}

exports.connect = (url, done) => {
    if (state.db) {
        return done()
    }

    MongoClient.connect(url, (err, db) => {
        if (err) {
            return done(err) 
        }

        state.db = db.db('myapi')
    
        done()
    })
}

exports.get = () => state.db