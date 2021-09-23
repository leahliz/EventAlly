const express=require("express");
const cors=require("cors");
var bodyparser=require("body-parser");
var jwt = require('jsonwebtoken')
/*const bcrypt = require('bcrypt');
const validator = require('validator');*/

var app=new express();

const eventData=require("./model/eventdata");
const userData = require("./model/Userdata");

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

app.post("/search",function(req,res){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS");
     console.log(req.body);
    let name=req.body.event;
    
    eventData.findOne({title:name})
    .then((obj)=>{
        if(!obj){
            res.status(401).send("Event does not exist");
        }
        else{
            console.log("Found"+obj);
            res.send(obj);
        }
      
       
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
        image:req.body.event.image ,
        owned:req.body.event.owned
    };

    console.log(events);
    var event=new eventData(events);
    event.save();

})

app.post("/dlt",function(req,res){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS");
    var events={
        id:req.body.event._id,
        title:req.body.event.title,
        date:req.body.event.date,
        venue:req.body.event.venue,
        organiser:req.body.event.organiser,
        description:req.body.event.description,
        image:req.body.event.image

    };
    
    var myquery={_id:events.id};
    eventData.deleteOne(myquery)
    .then((obj)=>{
    console.log("deleted");})
});

username =  'admin@gmail.com';
password = '4FJaRrkFjVvRe6S';

app.post('/adminLogin', (req, res) => {

    let nuser = req.body;

    if (nuser.email !==username) {
        res.status(401).send('Invalid Username');
    }
    else if (nuser.password!==password) {
        res.status(401).send('Invalid Password');
    }
    else {
        console.log('Validation Success!');
        let payload = { subject: username + password };
        let token = jwt.sign(payload, 'secretKey');
        res.status(200).send({ token });
    }
});

app.get("/users",function (req, res) {

    userData.find()
        .then(function (users) {
            res.send(users);
        });
});
app.delete('/removeUsers/:id', (req, res) => {
    id = req.params.id;
    userData.findByIdAndDelete({ "_id": id })
        .then(() => {
            console.log("Deleted")
            /*window.location.reload();*/
        })
});


/*
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

})*/
app.post("/login",(req,res)=>{
    let user=req.body;
userData.findOne({$and:[{email:user.email},{password:user.password}]})
.then((obj)=>{
    if(!obj){
    res.status(401).send("Invalid username or password");
    }
    else{
        console.log("succes");
        let payload={subject:user.email+user.password};
        let token=jwt.sign(payload,"secretKey");
        console.log(token);
        res.status(200).send({token,email:user.email});
    }
})
});

app.post("/register",(req,res)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS");
    console.log(req.body);
    var User={
        FirstName:req.body.user.name,
        
        email:req.body.user.email,
        password:req.body.user.password
    };
    var nuse=new userData(User);
    nuse.save();
    let payload={subject:User.email+User.password};
        let token=jwt.sign(payload,"secretKey");
        res.status(200).send({token});
});


app.listen(3100,function(){
    console.log("listening at 3100");
})