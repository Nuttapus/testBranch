const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectID
const url = 'mongodb+srv://admin:a123456@cluster0-wp2ii.mongodb.net/test?retryWrites=true'
const dbName = 'sourcesoft';
const app = express()
const port = 4001

app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true, parameterLimit: 100000 }));
app.use(cors())


app.post('/get', (req, res) => {
    mongoClient.connect(url, (_, client) => {
        const db = client.db(dbName)
        if (req.body.type === "login") {
            db.collection('MST_Employee').find({}).toArray(function(_, result) {
                res.json({ data: result })
                client.close();
            });
        } else if (req.body.type === "MST_Employee") {
            db.collection('MST_Employee').find({}).toArray(function(_, result) {
                res.json({ data: result })
                client.close();
            })
        } else if (req.body.type === "TRN_Sell") {
            db.collection('TRN_Sell').find({}).toArray(function(_, result) {
                res.json({ data: result })
                client.close();
            })
        } else if (req.body.type === "MST_Customer") {
            db.collection('MST_Customer').find({}).toArray(function(_, result) {
                res.json({ data: result })
                client.close();
            })
        } else if (req.body.type === "car") {
            db.collection('TRN_Sell').findOne({ ID_TRN_Sell: req.body.ID_TRN_Sell }, (_, result) => {
                res.json({ data: result })
                client.close();
            })
        } else if (req.body.type === "TRN_Repair") {
            db.collection('TRN_Repair').find({}).toArray(function(_, result) {
                res.json({ data: result })
                client.close();
            })
        } else if (req.body.type === "TRN_Buy") {
            db.collection('TRN_Buy').find({}).toArray(function(_, result) {
                res.json({ data: result })
                client.close();
            })
        } else if (req.body.type === "TRN_Bill") {
            db.collection('TRN_Bill').find({}).toArray(function(_, result) {
                res.json({ data: result })
                client.close();
            })
        }
    })
})

app.post('/insert', (req, res) => {
    mongoClient.connect(url, (_, client) => {
        const db = client.db(dbName)
        if (req.body.type === "buy") {
            db.collection('TRN_Buy').find({}).toArray(function(err, result) {
                var count = result.length
                count += 1
                db.collection('TRN_Buy').findOne({ ID_TRN_Buy: req.body.ID_TRN_Buy }, (err, result) => {
                    if (result === null) {
                        const newBuy = {
                            ID_TRN_Buy: "buy" + count,
                            brand: req.body.brand,
                            model: req.body.model,
                            machineNumber: req.body.machineNumber,
                            purchasePrice: (req.body.purchasePrice),
                            picture: req.body.picture,
                            transportationCost: req.body.transportationCost,
                            commission: req.body.commission,
                            namePartner: req.body.namePartner,
                            vat: (req.body.vat),
                            total: (req.body.total),
                            name_MST_Employee: req.body.name_MST_Employee
                        };
                        db.collection('TRN_Buy').insertOne(newBuy, (err, result1) => {
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
            db.collection('MST_Employee').find({}).toArray(function(_, result) {
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
            db.collection('MST_Registration').find({}).toArray(function(err, result) {
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
                        db.collection('MST_Registration').insertOne(newRegis, (err, result1) => {
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
            db.collection('TRN_Repair').find({}).toArray(function(err, result) {
                var count = result.length
                count += 1
                db.collection('TRN_Repair').findOne({ ID_TRN_Repair: "r" + count }, (err, result1) => {
                    const newRepair = {
                        "ID_TRN_Repair": "r" + count,
                        "brand": req.body.brand,
                        "model": req.body.model,
                        "machineNumber": req.body.machineNumber,
                        "pointsRepair": req.body.pointsRepair,
                        "nameEmployee": req.body.nameEmployee,
                        "nameAppraise": req.body.nameAppraise,
                        "nameTechnician": req.body.nameTechnician,
                        "nameTester": req.body.nameTester,
                        "name_MST_Employee": req.body.empoyee
                    }
                    if (result1 === null) {
                        db.collection('TRN_Repair').insertOne(newRepair, (err, result1) => {
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
            db.collection('TRN_RepairDetail').find({}).toArray(function(_, result) {
                var count = result.length
                count += 1
                db.collection('TRN_RepairDetail').findOne({ ID_TRN_RepairDetail: "rpd" + count }, (_, result1) => {
                    const newDetail = {
                        "ID_TRN_RepairDetail": "rpd" + count,
                        "total": req.body.total,
                        "nameTechnician": req.body.nameTechnician,
                        "nameTester": req.body.nameTester,
                        "part": req.body.part,
                        "id_TRN_Repair": req.body.idtrn,
                        "name_MST_Employee": req.body.nameEmp
                    }
                    if (result1 === null) {
                        db.collection('TRN_RepairDetail').insertOne(newDetail, (err, result1) => {
                            client.close()
                            res.json({ status: true })
                        })
                    } else {
                        res.json({ status: false })
                        client.close()
                    }

                });
            });
        } else if (req.body.type === "MST_Customer") {
            db.collection('MST_Customer').find({}).toArray(function(err, result) {
                var count = result.length
                count += 1
                db.collection('MST_Customer').findOne({ ID_MST_Customer: req.body.idDB }, (err, result1) => {
                    const newCus = {
                        "ID_MST_Customer": "c" + count,
                        "name": req.body.name,
                        "lastname": req.body.lastname,
                        "birthday": req.body.date,
                        "idCardNumber": req.body.id,
                        "sex": req.body.sex,
                        "email": req.body.email,
                        "address": req.body.address,
                        "tambon": req.body.tumbon,
                        "amphoe": req.body.aumphoe,
                        "city": req.body.city,
                        "postcode": req.body.post,
                        "tel": req.body.mobile,
                        "typeCus": req.body.typeCus
                    }
                    if (result1 === null) {
                        db.collection('MST_Customer').insertOne(newCus, (err, result1) => {
                            client.close()
                            res.json({ status: true })
                        })
                    } else {
                        res.json({ status: false })
                        client.close()
                    }
                });
            });
        } else if (req.body.type === "sell") {
            db.collection('TRN_Sell').find({}).toArray(function(err, result) {
                var count = result.length
                count += 1
                db.collection('TRN_Sell').findOne({ ID_TRN_Sell: req.body.ID_TRN_Sell }, (err, result) => {
                    if (result === null) {
                        const newBuy = {
                            ID_TRN_Sell: "sell" + count,
                            brand: req.body.brand,
                            model: req.body.model,
                            generateYear: req.body.generateYear,
                            gear: req.body.gear,
                            cc: req.body.cc,
                            carYear: req.body.carYear,
                            detailModel: req.body.detailModel,
                            options: req.body.options,
                            miles: req.body.miles,
                            registerYear: req.body.registerYear,
                            color: req.body.color,
                            salePrice: req.body.salePrice,
                            topic: req.body.topic,
                            textArea: req.body.textArea,
                            licensePlate: req.body.licensePlate,
                            machineNumber: req.body.machineNumber,
                            bodyNumber: req.body.bodyNumber,
                            picture: req.body.picture,
                            detailCustomer: req.body.detailCustomer,
                            name_MST_Employee: req.body.name_MST_Employee
                        };
                        db.collection('TRN_Sell').insertOne(newBuy, (err, result1) => {
                            client.close()
                            res.json({ status: true, id: "sell" + count })
                        })
                    } else {
                        res.json({ status: false })
                        client.close()
                    }
                })
            })
        } else if (req.body.type === "TRN_RegistrationReceipt") {
            db.collection('TRN_RegistrationReceipt').find({}).toArray(function(err, result) {
                var count = result.length
                count += 1
                db.collection('TRN_RegistrationReceipt').findOne({ ID_TRN_RegistrationReceipt: req.body.ID_TRN_RegistrationReceipt }, (err, result) => {
                    if (result === null) {
                        const newBuy = {
                            ID_TRN_RegistrationReceipt: "RTR" + count,
                            date: req.body.date,
                            registration: req.body.registration,
                            idCar: req.body.idCar,
                            nameCustomer: req.body.nameCustomer,
                            telCustomer: req.body.telCustomer,
                            name_MST_Employee: req.body.name_MST_Employee,
                        };
                        db.collection('TRN_RegistrationReceipt').insertOne(newBuy, (err, result1) => {
                            client.close()
                            res.json({ status: true })
                        })
                    } else {
                        res.json({ status: false })
                        client.close()
                    }
                })
            })
        } else if (req.body.type === "TRN_CarReceipt") {
            db.collection('TRN_CarReceipt').find({}).toArray(function(err, result) {
                var count = result.length
                count += 1
                db.collection('TRN_CarReceipt').findOne({ ID_TRN_CarReceipt: req.body.ID_TRN_CarReceipt }, (err, result) => {
                    if (result === null) {
                        const newBuy = {
                            ID_TRN_CarReceipt: "CR" + count,
                            date: req.body.date,
                            model: req.body.model,
                            idCar: req.body.idCar,
                            nameCus: req.body.nameCus,
                            tel: req.body.tel,
                            name_MST_Employee: req.body.name_MST_Employee,
                        };
                        db.collection('TRN_CarReceipt').insertOne(newBuy, (err, result) => {
                            client.close()
                            res.json({ status: true })
                        })
                    } else {
                        res.json({ status: false })
                        client.close()
                    }
                })
            })

        } else if (req.body.type === "TRN_Invoice") {
            db.collection('TRN_Invoice').find({}).toArray(function(err, result) {
                var count = result.length
                count += 1
                db.collection('TRN_Invoice').findOne({ TRN_Invoice: req.body.TRN_Invoice }, (err, result) => {

                    if (result === null) {
                        if (req.body.invoiceType === "buy") {
                            const newInvoice = {
                                TRN_Invoice: "Iv" + count,
                                invoidNumber: req.body.invoidNumber,
                                nameCus: req.body.nameCus,
                                idCardNumber: req.body.idCardNumber,
                                date: req.body.date,
                                address: req.body.address,
                                invoiceType: req.body.invoiceType,
                                listProduct: req.body.listProduct,
                                total: (req.body.total),
                                tax: (req.body.tax),
                                allTotal: (req.body.allTotal),
                                name_MST_Employee: req.body.name_MST_Employee,
                            };
                            db.collection('TRN_Invoice').insertOne(newInvoice, (err, result) => {
                                client.close()
                                res.json({ status: true })
                            })
                        }
                        if (req.body.invoiceType === "regis") {
                            const newInvoice = {
                                TRN_Invoice: "Iv" + count,
                                invoidNumber: req.body.invoidNumber,
                                nameCus: req.body.nameCus,
                                tel: req.body.tel,
                                date: req.body.date,
                                invoiceType: req.body.invoiceType,
                                listProduct: req.body.listProduct,
                                total: (req.body.total),
                                tax: (req.body.tax),
                                allTotal: (req.body.allTotal),
                                name_MST_Employee: req.body.name_MST_Employee,
                            };
                            db.collection('TRN_Invoice').insertOne(newInvoice, (err, result) => {
                                client.close()
                                res.json({ status: true })
                            })
                        }
                        if (req.body.invoiceType === "fix") {
                            const newInvoice = {
                                TRN_Invoice: "Iv" + count,
                                invoiceNumber: req.body.invoiceNumber,
                                modelCar: req.body.modelCar,
                                date: req.body.date,
                                invoiceType: req.body.invoiceType,
                                listProduct: req.body.listProduct,
                                total: (req.body.total),
                                tax: (req.body.tax),
                                allTotal: (req.body.allTotal),
                                name_MST_Employee: req.body.name_MST_Employee,
                            };
                            db.collection('TRN_Invoice').insertOne(newInvoice, (err, result) => {
                                client.close()
                                res.json({ status: true })
                            })
                        }
                    } else {
                        res.json({ status: false })
                        client.close()
                    }
                })
            })
        } else if (req.body.type === "TRN_Bill") {
            db.collection('TRN_Bill').find({}).toArray(function(err, result) {
                var count = result.length
                count += 1
                db.collection('TRN_Bill').findOne({ TRN_Bill: req.body.TRN_Bill }, (err, result) => {
                    if (result === null) {
                        if (req.body.billType === "buy") {
                            const newBill = {
                                TRN_Bill: "B" + count,
                                invoiceNumber: req.body.invoiceNumber,
                                nameCus: req.body.nameCus,
                                idCardNumber: req.body.idCardNumber,
                                date: req.body.date,
                                address: req.body.address,
                                billType: req.body.billType,
                                listProduct: req.body.listProduct,
                                total: (req.body.total),
                                tax: (req.body.tax),
                                allTotal: (req.body.allTotal),
                                name_MST_Employee: req.body.name_MST_Employee,
                            };
                            db.collection('TRN_Bill').insertOne(newBill, (err, result) => {
                                client.close()
                                res.json({ status: true })
                            })
                        }
                        if (req.body.billType === "regis") {
                            const newBill = {
                                TRN_Bill: "B" + count,
                                invoiceNumber: req.body.invoiceNumber,
                                nameCus: req.body.nameCus,
                                tel: req.body.tel,
                                date: req.body.date,
                                billType: req.body.billType,
                                listProduct: req.body.listProduct,
                                total: (req.body.total),
                                tax: (req.body.tax),
                                allTotal: (req.body.allTotal),
                                name_MST_Employee: req.body.name_MST_Employee,
                            };
                            db.collection('TRN_Bill').insertOne(newBill, (err, result) => {
                                client.close()
                                res.json({ status: true })
                            })
                        }
                        if (req.body.billType === "fix") {
                            const newBill = {
                                TRN_Bill: "B" + count,
                                invoiceNumber: req.body.invoiceNumber,
                                modelCar: req.body.modelCar,
                                date: req.body.date,
                                billType: req.body.billType,
                                listProduct: req.body.listProduct,
                                total: (req.body.total),
                                tax: (req.body.tax),
                                allTotal: (req.body.allTotal),
                                name_MST_Employee: req.body.name_MST_Employee,
                            };
                            db.collection('TRN_Bill').insertOne(newBill, (err, result) => {
                                client.close()
                                res.json({ status: true })
                            })
                        }
                    } else {
                        res.json({ status: false })
                        client.close()
                    }
                })
            })
        } else if (req.body.type === "TRN_Contracts") {
            db.collection('TRN_Contracts').find({}).toArray(function(err, result) {
                var count = result.length
                count += 1
                db.collection('TRN_Contracts').findOne({ ID_TRN_Contracts: req.body.ID_TRN_Contracts }, (err, result) => {
                    if (result === null) {
                        const newContracts = {
                            at: req.body.at,
                            date: req.body.date,
                            nameBuyer: req.body.nameBuyer,
                            numberBuyer: req.body.numberBuyer,
                            addressBuyer: req.body.addressBuyer,
                            nameGuarantor: req.body.nameGuarantor,
                            numberGuarantor: req.body.numberGuarantor,
                            addressGuarantor: req.body.addressGuarantor,
                            textPrice: req.body.textPrice,
                            paytype: req.body.paytype,
                            brand: req.body.brand,
                            model: req.body.model,
                            year: req.body.year,
                            gear: req.body.gear,
                            color: req.body.color,
                            numberRegistration: req.body.numberRegistration,
                            numberEngine: req.body.numberEngine,
                            numberTank: req.body.numberTank,
                            total: (req.body.total)
                        };
                        db.collection('TRN_Contracts').insertOne(newContracts, (err, result) => {
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
            db.collection("MST_Employee").update({ username: req.body.username }, updateData, function(err, result1) {
                res.json({ status: true })
                client.close();
            });
        } else if (req.body.type === "MST_Customer") {
            const updateData = {
                "ID_MST_Customer": req.body.idDB,
                "name": req.body.name,
                "lastname": req.body.lastname,
                "birthday": req.body.date,
                "idCardNumber": req.body.id,
                "sex": req.body.sex,
                "email": req.body.email,
                "address": req.body.address,
                "tambon": req.body.tumbon,
                "amphoe": req.body.aumphoe,
                "city": req.body.city,
                "postcode": req.body.post,
                "tel": req.body.mobile,
                "typeCus": req.body.typeCus
            }
            db.collection("MST_Customer").update({ idCardNumber: req.body.id }, updateData, function(err, result1) {
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
            db.collection(type).deleteOne({ username: req.body.username }, (_, obj) => {
                res.json({ data: obj })
                client.close();
            });
        } else if (type === "MST_Customer") {
            db.collection(type).deleteOne({ idCardNumber: req.body.idCardNumber }, (_, obj) => {
                res.json({ data: obj })
                client.close();
            });
        } else if (type === "TRN_Repair") {
            db.collection(type).deleteOne({ machineNumber: req.body.machineNumber }, (_, obj) => {
                res.json({ data: obj })
                client.close();
            });
        }
    })
})
app.listen(port, () => {
    console.log(`App listening on ${port}`)
})