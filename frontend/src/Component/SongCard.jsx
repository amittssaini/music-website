import React, { useEffect, useRef, useState } from 'react';
import { Card, CardActionArea, Typography, CardMedia, CardContent, CardActions, InputAdornment, Button } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import DoneIcon from '@mui/icons-material/Done';
import { config } from '../App';
import axios from 'axios';
import {useSnackbar} from 'notistack'

const SongCard = ({ title, artist, photo, audio, songId, playlistMode, playingSongId, onPlay }) => {
    const audioRef = useRef(null);
    const { enqueueSnackbar } = useSnackbar();
    const [isAdd,setIsAdd]=useState(false)
    const isPlaying = playingSongId === songId; // Check if this song is currently playing

    useEffect(() => {
        if (isPlaying) {
            audioRef.current.play(); // Play the song if it's the one that's selected
        } else {
            audioRef.current.pause(); // Pause the song if it's not the one selected
        }
    }, [isPlaying]);

    const handlePlayPause = () => {
        onPlay(isPlaying ? null : songId); // Toggle play/pause
    };

    const addToPlaylist = async() => {
        const email = localStorage.getItem('email');
console.log('add to the playlist');
console.log(email,songId);
        try {
            const response = await axios.post(`${config.endpoint}/user/playlist`, {
                email: email,
                songId: songId,
              }, {
                headers: {
                  'Content-Type': 'application/json',
                }
              });
              enqueueSnackbar("Login successfully", { variant: "success" });
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
        setIsAdd(!isAdd);
        
    };
    return (
        <Card sx={{ maxWidth: 200, maxHeight: 350, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    sx={{ width: 200, height: 140, objectFit: 'cover' }}
                    image={`http://localhost:8082/${photo}`}
                    alt={title}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {artist}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions style={{ display: 'flex', justifyContent: 'center' }}>
                <Button size="small" color="primary" onClick={handlePlayPause}>
                    {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
                </Button>
                {playlistMode?null:(isAdd ? (
                    <DoneIcon />
                ) : (
                    <Button size="small" color="primary" value={songId} onClick={addToPlaylist}>
                        <InputAdornment position="center">
                            <AddCircleIcon />
                        </InputAdornment>
                    </Button>
                ))}
            </CardActions>
            <audio ref={audioRef} src={`http://localhost:8082/${audio}`} />
        </Card>
    );
};

export default SongCard;
