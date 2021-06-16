const express = require('express');
const hbs = require('hbs')

var app = express()
app.set('view engine', 'hbs')

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: false}))

app.get('/list',(req,res)=>{
    var ds = [];
    ds.push({id: 1, name:'iPhone', price:300});
    ds.push({id: 2, name:'Samsung', price:350});
    ds.push({id: 3, name:'Asus', price:400});
    res.render('all', {danhsach:ds});
})

app.post('/insert',(req,res)=>{
    var name = req.body.name;
    var price = req.body.price;
    if(name.length<6 && (isFinite(price) == false || price<10)){
        res.render('new', {nameError: 'Ten ko nho hon 5 ki tu', priceError: 'gia phai la so lon hon 10'})
    }
    else if(name.length<6){
        res.render('new', {nameError: 'Ten ko nho hon 5 ki tu'})
    }
    else if(price.trim().length == 0 || isFinite(price) == false || price<10){
        res.render('new', {priceError: 'gia phai la so lon hon 10'})
    }
    else{
        res.render('saveDone', {name:name, price:price})
    }
})
app.post('/done',(req,res)=>{
    var name = req.body.name;
    var arr = name.split(",")
    var ds = [];
    var i;
    for (i = 0; i < arr.length; i++) {
        arr[i] = arr[i].trim()
        var text = "- " + arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
        ds.push({n: text})
    }
    res.render('result', {name:ds})
})
app.get('/new',(req,res)=>{
    res.render('new');
})
app.get('/tp',(req,res)=>{
    res.render('tp');
})

app.get('/', (req, res) =>{
    res.render('index', {name: 'la', school:'FPT'})
})

var PORT = process.env.PORT ||5000
app.listen(PORT);
console.log("Server is running at " + PORT)