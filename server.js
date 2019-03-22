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


app.get('/getEmployee', (req, res) => {
    mongoClient.connect(url, (err, client) => {
        const db = client.db(dbName)
        db.collection('MST_Employee').find({}).toArray(function (err, result) {
            if (err) throw err;
            res.json({ data: result })
            client.close();
        });
    })
})

app.post('/setEmployee', (req, res) => {
    mongoClient.connect(url, (err, client) => {
        const db = client.db(dbName)
        db.collection('MST_Employee').find({}).toArray(function (err, result) {
            var count = result.length
            count += 1
            db.collection('MST_Employee').findOne({ username: req.body.username }, (err, result1) => {
                const newUser = {
                    "ID_MST_Employee": "e"+count,
                    "name": req.body.name,
                    "lastname": req.body.lastname,
                    "birthday": req.body.date,
                    "idCardNumber": req.body.id,
                    "sex": req.body.sex,
                    "email": req.body.email,
                    "username": req.body.username,
                    "password": req.body.password,
                    "address": req.body.address,
                    "tambon": req.body.tumbon,
                    "amphoe": req.body.aumphoe,
                    "city": req.body.city,
                    "postcode": req.body.post,
                    "tel": req.body.mobile,
                    "department": req.body.department
                }
                if (result1 === null) {
                    db.collection('MST_Employee').insertOne(newUser, (err, result2) => {
                        if (err) throw err
                        client.close()
                        res.json({ status: true })
                    })
                } else {
                    res.json({ status: false })
                    client.close()
                }

            });
        });
    })
})
app.listen(port, () => {
    console.log(`App listening on ${port}`)
})