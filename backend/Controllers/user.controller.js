const User = require('../Services/user.service');
const userInstance = new User();

// this is method to fetch all the users 
const getUsers=async(req,res)=>{
    try {
        const result = await userInstance.fetchUsers();
        res.send(result)
    } catch (error) {
        res.send(error)
    }
}
// this is method which is used for post the song to the playlist or add the song to the user playlist
const postSong=async(req,res)=>{
    try {
        console.log(req.body);
        //res.send('hello playlist')
        const {email,songId} = req.body; // we should fetch the user email and song id
        const result = await userInstance.addSong(email,songId)
        res.send(result);
    } catch (error) {
        
    }
}
// this is method which is used for the fetching all the songs of user playlist
const getPlaylist=async(req,res)=>{
try {
    const email = req.query.email
    console.log(email)
    console.log('controller')
    console.log(email)
    const result =  await userInstance.getUserPlaylist(email)
    res.send(result.playlist);
} catch (error) {
    res.send(error);
}
}

module.exports = {postSong,getUsers,getPlaylist}