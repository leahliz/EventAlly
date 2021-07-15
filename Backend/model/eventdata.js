const mongoose=require("mongoose");
mongoose.connect("mongodb+srv://userone:userone@libappvers0.op9lt.mongodb.net/LibAppVers0?retryWrites=true&w=majority",{useNewUrlParser:true,useUnifiedTopology:true});
const Schema=mongoose.Schema;

const eventSchema=new Schema({
     id:String,
     title:String,
     date:String,
     venue:String,
     organiser:String,
     description:String,
     image:String
});
 var eventdata=mongoose.model("eventdata",eventSchema);
 module.exports=eventdata;
