import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Grid,Box } from '@mui/material'
import SongCard from './SongCard'
import Media from './Media'
import Header from './Header'
import { config } from '../App'
import {useSnackbar } from 'notistack'
const Songs = () => {
    const [musicData,setMusicData]=useState([])
    const [searchInput,setSearchInput]=useState('');
    const [playingSongId,setPlayingSongId]=useState(null)
    const { enqueueSnackbar } = useSnackbar();

    const fetchData=async(search='')=>{
        console.log('search-input',search)
        let url=`${config.endpoint}/songs`
    
        if(search!=='')
        {
          url= `${config.endpoint}/songs?title=${search}`
        }
try {


    let resp = await axios.get(url);
    //console.log(resp.data);
    let data = resp.data
    console.log('i am data')
    console.log(data);
    setMusicData(data);
   
} catch (e) {
    if (e.response && e.response.status === 400) {
        return enqueueSnackbar(e.response.data.message, { variant: "error" });
      } else {
        enqueueSnackbar(
          "Something went wrong. check that the backend is running, reachable and return valid JSON.",
          { variant: "error" }
        );
      }
}
    }
    useEffect(()=>{
        fetchData();
    },[])


    useEffect(()=>{
fetchData(searchInput);
    },[searchInput])

    const handleSearchInput=(e)=>{
        setSearchInput(e.target.value)
    }


    const handlePlay = (songId) => {
        setPlayingSongId(songId); // Set the ID of the song to play
    };

  return (
   <>        
   <Header searchInput={searchInput} handleSearchInput={handleSearchInput} />
<Box style={{backgroundColor:'black',padding:16,minHeight:'100vh'}}>
<Grid container spacing={4}  >
    {
        musicData.map((song)=>(<Grid item  key={song._id}>
            <SongCard  songId = {song._id} title ={song.title} artist = {song.artist} audio={song.audio} photo = {song.coverPhoto} playlistMode={false} playingSongId={playingSongId} onPlay={handlePlay}/>
            </Grid>))
    }
</Grid>
</Box>
   </>
  )
}

export default Songs