//Accessing mongoose package
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

//Database connection
//('mongodb://localhost:27017/Events');
mongoose.connect("mongodb+srv://userone:userone@libappvers0.op9lt.mongodb.net/LibAppVers0?retryWrites=true&w=majority",{useNewUrlParser:true});

//schema definition
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    id: { type: String },
    FirstName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) throw new Error("Invalid Email Provided")
        }
    },
    password: {
        type: String,
        required: true
    }
});

UserSchema.pre('save', async function (next) {
    const user = this;
    user.password = await bcrypt.hash(user.password, 8)
    next();
})

UserSchema.statics.findByCredentials = async (email, password) => {
    const user = await Userdata.findOne({ email })
    if (!user) throw new Error("Unable to LOGIN (Please SIGNUP)")

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) throw new Error("Incorrect Password")
    return user
}
//Model creation
const Userdata = mongoose.model('userdata', UserSchema);
module.exports = Userdata;