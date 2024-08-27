const Songs = require('../Services/song.service');
const songsInstance = new Songs();
// this is controller  method is used for creating the songs into the mongodb we should pass the data to the mongodb
const postSongs=async(req,res)=>{
    try {
        const song = req.body;
        const result = await songsInstance.createNewSong(song);
        res.send(result);
    } catch (error) {
     res.send(error)   
    }
}

// this is controller  method to fetch the songs  we should also pass the title i.e. for search bar 
// means when user search the songs we should fetch the only that particular songs 
const getSongs=async(req,res)=>{
    try {
        console.log(req.query.title);
        const search = req.query.title
        const result = await songsInstance.fetchSongs(search);
        res.send(result);
    } catch (error) {
        res.send(error)
    }
}

module.exports = {postSongs,getSongs}