let express = require('express');
let app = express();
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const dotenv = require('dotenv');
dotenv.config()
let port = process.env.PORT ||8230;
const mongoUrl = process.env.mongoUrlLive;
const bodyParser = require('body-parser');
const cors = require('cors');


// middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(cors())

app.get('/',(req,res)=>{
    res.send("welcome uviiii")
})

app.get('/home',(req,res)=>{
    db.collection('products').find().toArray((err,result)=>{
        if (err) throw err;
        res.send(result)

    })
})


// product wrt item 

app.get('/product/category_id=2/', (req, res) => {
    let typeId = Number(req.query.type_id);
    // let restId = mongo.ObjectId(req.params.id)
    db.collection('electronics').find({type_id:typeId}).toArray((err, result) => {
        if (err) throw err;
        res.send(result)
    })
})
app.get('/product/category_id=1/', (req, res) => {
    let typeId = Number(req.query.type_id);
    // let restId = mongo.ObjectId(req.params.id)
    db.collection('fashion').find({type_id:typeId}).toArray((err, result) => {
        if (err) throw err;
        res.send(result)
    })
})
app.get('/product/category_id=3/', (req, res) => {
    let typeId = Number(req.query.type_id);
    // let restId = mongo.ObjectId(req.params.id)
    db.collection('books').find({type_id:typeId}).toArray((err, result) => {
        if (err) throw err;
        res.send(result)
    })
})


app.get('/detail/',(req,res)=>{
   let query = {}
   let typeId = Number(req.params.type_id);

     query= {
        "type_id":typeId
    }
   db.collection('fashion').find({query}).toArray((err, result) => {
    if (err) throw err;
    res.send(result)
})
})



// Connection with db
MongoClient.connect(mongoUrl, (err, client) => {
    if (err) console.log(`Error while connecting`);
    db = client.db('ishop');
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`)
    })
})