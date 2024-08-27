const songsModel = require('../Models/songs.model');

class Songs{

    createNewSong=async(song)=>{
      try {
          const{coverPhoto,audio} = song;
          const coverPhotoPath = `photos/${coverPhoto}`;
          const audioPath = `songs-audio/${audio}`
        //   console.log(coverPhotoPath);
        //   console.log(audioPath);
          song= {...song,audio:audioPath,coverPhoto:coverPhotoPath}
          console.log(song);
          const newSongCollection = new songsModel(song)
          const result = await newSongCollection.save();
          return result;
      } catch (error) {
        return error
      }
    }

    fetchSongs=async(searchInput)=>{
        try {
          let result ;
          if(searchInput===undefined)
          {
             result = await songsModel.find({});
          }
          else{
            result  = await songsModel.find({ title: { $regex: searchInput, $options: 'i' } })

          }
            
            return result;
        } catch (error) {
            
        }
    }
}

module.exports = Songs;