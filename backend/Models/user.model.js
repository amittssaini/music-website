const mongoose = require('mongoose');
const validator = require('validator')

// we define the schema of user
const userSchema = new mongoose.Schema(
    {
        email :{type:String, required:true,unique:true,validate:{
            validator:validator.isEmail,
            message:`Email is invalid` // this is for email validation
        }},
        password:{type:String,required:true},
        playlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'songs' }] 
    }
)
/*
in playlist field we should pass the object id of song i.e. used when we create playlist and fetch the 
all songs in playlist of that user
*/
const userModel = mongoose.model("users",userSchema);

module.exports = userModel;