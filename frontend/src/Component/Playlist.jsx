import React, { useEffect } from 'react'
import { Grid,Box } from '@mui/material';
import Header from './Header';
import SongCard from './SongCard';
import { useState } from 'react';
import { config } from '../App';
import axios from 'axios';
const Playlist = () => {
    const [songs,setSongs]=useState([]);
    const [playingSongId,setPlayingSongId]=useState(null)

   const fetchPlaylist=async()=>{
  try {
    const email = localStorage.getItem('email');
    const result = await axios.get(`${config.endpoint}/user/playlist?email=${email}`)
    const data = result.data;
    setSongs(data);
    console.log('playlist data ',data)
  } catch (error) {
    
  }
    }
    const handlePlay = (songId) => {
        setPlayingSongId(songId); // Set the ID of the song to play
    };
    useEffect(()=>{
        fetchPlaylist();
    },[])
  return (
<>        
   {/* <Header /> */}
<Box style={{backgroundColor:'black',padding:16,minHeight:'100vh'}}>
<Grid container spacing={4}  >
    {
        songs.map((song)=>(<Grid item  key={song._id}>
            <SongCard  songId = {song._id} title ={song.title} artist = {song.artist} audio={song.audio} photo = {song.coverPhoto} playlistMode={true} playingSongId={playingSongId} onPlay={handlePlay}/>
            </Grid>))
    }
</Grid>
</Box>
   </>
  )
}

export default Playlist