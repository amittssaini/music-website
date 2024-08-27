const mongoose = require('mongoose');
// here we define the schema of song 
const songSchema = new mongoose.Schema({
    title:{type:String,required:true},
    artist:{type:String,required:true},
    coverPhoto:{type:String,required:true},
    audio:{type:String,required:true}
})

const songsModel = mongoose.model("songs",songSchema);

module.exports = songsModel; 