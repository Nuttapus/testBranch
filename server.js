const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectID
const url = 'mongodb://admin:a123456@ds227325.mlab.com:27325/softsource'
const dbName = 'softsource';
const app = express()
const port = 4001

app.use(bodyParser.json())
app.use(cors({ origin: true }))


app.get('/checkLogin', (req, res) => {
    mongoClient.connect(url, (err, client) => {
        const db = client.db(dbName)
        db.collection('MST_Employee').find({}).toArray(function (err, result) {
            if (err) throw err;
            res.json({ data: result })
            client.close();
        });
    })
})

app.listen(port, () => {
    console.log(`App listening on ${port}`)
})