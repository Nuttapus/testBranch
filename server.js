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
        if (req.body.type === "login") {
            const db = client.db(dbName)
            db.collection('MST_Employee').find({}).toArray(function (err, result) {
                if (err) throw err;
                res.json({ data: result })
                client.close();
            });
        } else if (req.body.type === "MST_Employee") {
            const db = client.db(dbName)
            db.collection('MST_Employee').find({}).toArray(function (err, result) {
                if (err) throw err;
                res.json({ data: result })
                client.close();
            })
        } else if (req.body.type === "TRN_Sell") {
            const db = client.db(dbName)
            db.collection('TRN_Sell').find({}).toArray(function (err, result) {
                if (err) throw err;
                res.json({ data: result })
                client.close();

            })
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
        } else if (req.body.type === "MST_Employee") {
            db.collection('MST_Employee').find({}).toArray(function (err, result) {
                var count = result.length
                count += 1
                db.collection('MST_Employee').findOne({ username: req.body.username }, (err, result1) => {
                    const newUser = {
                        "ID_MST_Employee": "e" + count,
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
        } else if (req.body.type === "MST_Registration") {
            db.collection('MST_Registration').find({}).toArray(function (err, result) {
                var count = result.length
                count += 1
                db.collection('MST_Registration').findOne({ registrationNumber: req.body.registrationNumber }, (err, result1) => {
                    const newRegis = {
                        "ID_MST_Registration": "rgt" + count,
                        "registrationDate": req.body.registrationDate,
                        "registrationNumber": req.body.registrationNumber,
                        "province": req.body.province,
                        "genre": req.body.genre,
                        "type": req.body.type,
                        "brand": req.body.brand,
                        "model": req.body.model,
                        "modelYear": req.body.modelYear,
                        "color": req.body.color,
                        "carNumber": req.body.carNumber,
                        "address": req.body.address,
                        "engineBand": req.body.engineBand,
                        "engineNumber": req.body.engineNumber,
                        "engineNumberAddress": req.body.engineNumberAddress,
                        "fuel": req.body.fuel,
                        "tankNumber": req.body.tankNumber,
                        "quantity": req.body.quantity,
                        "cc": req.body.cc,
                        "horsePower": req.body.horsePower,
                        "carWeight": req.body.carWeight,
                        "payLoad": req.body.payLoad,
                        "totalWeight": req.body.totalWeight,
                        "seat": req.body.seat
                    }
                    if (result1 === null) {
                        console.log("save")
                        db.collection('MST_Registration').insertOne(newRegis, (err, result2) => {
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
        } else if (req.body.type === "TRN_Repair") {
            db.collection('TRN_Repair').find({}).toArray(function (err, result) {
                var count = result.length
                count += 1
                db.collection('TRN_Repair').findOne({ ID_TRN_Repair: "r" + count }, (err, result1) => {

                    const newRepair = {
                        "ID_TRN_Repair": "r" + count,
                        "brand": req.body.brand,
                        "model": req.body.model,
                        "machineNumber": req.body.machineNumber,
                        "poinstsRepair": req.body.poinstsRepair,
                        "pictureRepair": "",
                        "nameEmployee": req.body.nameEmployee,
                        "nameAppraise": req.body.nameAppraise,
                        "nameTechnician": req.body.nameTechnician,
                        "nameTester": req.body.nameTester,
                        "name_MST_Employee": "ประหยุด จันอังคาร"
                    }
                    if (result1 === null) {
                        db.collection('TRN_Repair').insertOne(newRepair, (err, result2) => {
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
        } else if (req.body.type === "TRN_RepairDetail") {
            db.collection('TRN_RepairDetail').find({}).toArray(function (err, result) {
                var count = result.length
                count += 1
                db.collection('TRN_RepairDetail').findOne({ ID_TRN_RepairDetail: "rpd" + count }, (err, result1) => {
                    const newDetail = {
                        "ID_TRN_RepairDetail": "rpd" + count,
                        "total": req.body.total,
                        "among": req.body.among,
                        "nameTechnician": req.body.nameTechnician,
                        "nameTester": req.body.nameTester,
                        "part": req.body.part,
                        "ID_TRN_ListRepairDetail": "lrpd" + count
                    }
                    if (result1 === null) {
                        db.collection('TRN_RepairDetail').insertOne(newDetail, (err, result2) => {
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
        }
    })
})

app.post('/update', (req, res) => {
    mongoClient.connect(url, (err, client) => {
        const db = client.db(dbName)
        if (req.body.type === "MST_Employee") {
            const updateData = {
                "ID_MST_Employee": req.body.idDB,
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
            db.collection("MST_Employee").update({ username: req.body.username }, updateData, function (err, result) {
                if (err) throw err;
                res.json({ status: true })
                client.close();
            });
        }
    })
})

app.post('/delete', (req, res) => {
    mongoClient.connect(url, (err, client) => {
        const db = client.db(dbName)
        const type = req.body.type
        if (type === "MST_Employee") {
            db.collection(type).deleteOne({ username: req.body.username }, (err, obj) => {
                if (err) throw err;
                res.json({ data: obj })
                client.close();
            });
        }
    })
})
app.listen(port, () => {
    console.log(`App listening on ${port}`)
})