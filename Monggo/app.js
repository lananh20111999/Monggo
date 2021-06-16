const express = require('express');
const hbs = require('hbs')

var app = express()
app.set('view engine', 'hbs')
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://lananh20:lananh20@cluster0.vq08y.mongodb.net/test";
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: false}))

app.get('/',(req,res)=>{
    res.render('index')
})
app.get('/view', async(req,res)=>{
    var client = await MongoClient.connect(url);
    var dbo = client.db("Test");
    var results = await dbo.collection("SanPham").find({}).toArray();
    res.render('allProduct', {model:results});
})
app.get('/insert',(req,res)=>{
    res.render('insert')
})
app.post('/doInsert', async(req,res)=>{
    var name = req.body.name;
    var price = req.body.price;
    var dai = req.body.dai;
    var rong = req.body.rong;
    var newproduct = {name: name, price:price, size: {dai:dai, rong: rong}};
    var client = await MongoClient.connect(url);
    var dbo = client.db("Test");
    await dbo.collection("SanPham").insertOne(newproduct);
    res.render('index');
})
var PORT = process.env.PORT ||5000
app.listen(PORT);
console.log("Server is running at " + PORT)