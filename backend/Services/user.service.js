const userModel = require('../Models/user.model');

class User{
    fetchUsers=async()=>{
        try {
            const result = await userModel.find({});
            return result;
        } catch (error) {
            return error;
        }
    }

    addSong=async(email,songId)=>{
        try {
            console.log('addSong');
            const user = await this.fetchUserByEmail(email);
            console.log(user)
            if(!user)
            {
                return "User not find";
            }
              console.log("user find")
            const check = user.playlist.includes(songId);
            if(check)
            {
                return "Song is Already Present "
            }
             user.playlist.push(songId);
            const result= await user.save();
            return result
            
           // return "Song is Added"
        } catch (error) {
             return error
        }
        
    }
   fetchUserByEmail=async(email)=>{
    try {
        const user = await userModel.findOne({email});
        return user
    } catch (error) {
        return error;
    }
   }
    getUserPlaylist=async(email)=>{
        try {
            console.log('services part')
            const user = await this.fetchUserByEmail(email);
            console.log(user);
            if(user)
            {
                const playlist = await user.populate('playlist');
                console.log(playlist)
                return playlist;
            }
        } catch (error) {
            return error;
        }
    }
}

module.exports = User;