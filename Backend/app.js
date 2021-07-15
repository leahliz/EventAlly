const express=require("express");
const cors=require("cors");
var bodyparser=require("body-parser");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const validator = require('validator');

var app=new express();

const eventData=require("./model/eventdata");
const Userdata = require("./model/Userdata");

app.use(cors());
app.use(bodyparser.json());
app.use(express.urlencoded({extended:true}));

app.get("/events",function(req,res){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS");
    eventData.find()
    .then(function(EventData){
        res.send(EventData);
    });
});

app.post("/update",function(req,res){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS");
   console.log(req.body);
    var events={
        id:req.body.event._id,
        title:req.body.event.title,
        date:req.body.event.date,
        venue:req.body.event.venue,
        organiser:req.body.event.organiser,
        description:req.body.event.description,
        image:req.body.event.image

    };
    console.log(events);
 var myquery={_id:events.id};
 var newvalue={$set:events};
 eventData.updateOne(myquery,newvalue)
 .then((obj)=>{
     console.log("UPdated"+obj);
 });
});

app.post("/addevent",function(req,res){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS");
    console.log(req.body);
    var events={
        title:req.body.event.title,
        date:req.body.event.date,
        venue:req.body.event.venue,
        organiser:req.body.event.organiser,
        description:req.body.event.description,
        image:req.body.event.image  
    };

    console.log(events);
    var event=new eventData(events);
    event.save();

})

username = 'admin@123.com';
password = '123456';

app.post('/adminLogin', (req, res) => {

    let userData = req.body;

    if (username !== userData.email) {
        res.status(401).send('Invalid Username');
    }
    else if (password !== userData.password) {
        res.status(401).send('Invalid Password');
    }
    else {
        console.log('Validation Success!');
        let payload = { subject: username + password };
        let token = jwt.sign(payload, 'secretKey');
        res.status(200).send({ token });
    }
});

app.post('/register', (req, res) => {

    let userData = req.body;
    console.log('User Data: ' + userData);

    var user = {
        name: userData.name,
        email: userData.email,
        password: userData.password,
    }
    var user = Userdata(user);
    user.save(); //save to DB
    res.redirect('');
});

app.post('/login', async (req, res) => {

    let email = req.body.email;
    var password = req.body.password;
    // console.log("email:" + email);
    // console.log("Password: " + password);
    // var password = bcrypt.hash(password, 8)
    // console.log("P: " + password);
    try {
        const user = await Userdata.findByCredentials(req.body.email, req.body.password)
        console.log('Valid User!');
        let payload = { subject: username + password };
        let token = jwt.sign(payload, 'secretKey');
        res.status(200).send({ token });
    }
    catch {
        res.status(401).send('Invalid Credentials');

    }

})

app.listen(3100,function(){
    console.log("listening at 3100");
})