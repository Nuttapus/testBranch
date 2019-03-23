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


app.post('/get', (req, res) => {
    mongoClient.connect(url, (err, client) => {
        console.log(req.body.type)
        if (req.body.type === "login") {
            const db = client.db(dbName)
            db.collection('MST_Employee').find({}).toArray(function (err, result) {
                if (err) throw err;
                res.json({ data: result })
                client.close();
            });
        }
    })
})

app.post('/insert', (req, res) => {
    mongoClient.connect(url, (err, client) => {
        const db = client.db(dbName)
        if (req.body.type === "buy") {
            db.collection('TRN_Buy').find({}).toArray(function (err, result) {
                var count = result.length
                count += 1
                db.collection('TRN_Buy').findOne({ ID_TRN_Buy: req.body.ID_TRN_Buy }, (err, result) => {
                    if (err) throw err
                    console.log(result)
                    if (result === null) {
                        const newBuy = {
                            ID_TRN_Buy: "buy" + count,
                            brand: req.body.brand,
                            model: req.body.model,
                            machineNumber: req.body.machineNumber,
                            purchasePrice: req.body.purchasePrice,
                            picture: req.body.picture,
                            transportationCost: req.body.transportationCost,
                            commission: req.body.commission,
                            namePartner: req.body.namePartner,
                            vat: req.body.vat,
                            total: req.body.total,
                            name_MST_Employee: req.body.name_MST_Employee
                        };
                        db.collection('TRN_Buy').insertOne(newBuy, (err, result) => {
                            if (err) throw err
                            client.close()
                            res.json({ status: true })
                        })
                    } else {
                        res.json({ status: false })
                        client.close()
                    }
                })
            })
        }
    })
})
app.listen(port, () => {
    console.log(`App listening on ${port}`)
})