const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors')
const path = require('path');
const authRouter = require('./Routes/auth.route')
const songsRouter = require('./Routes/songs.route')
const userRouter = require('./Routes/user.route')
// Connection of Server
const app = express();
const port =process.env.PORT
app.listen(port,()=>console.log(`Server is Connected at the Port ${port}`))


// connection code of mongoose DB

const db_uri = process.env.MONGODB_URI  // fetching the variable which is save in secure file
mongoose
.connect(`${db_uri}`)
.then(()=>console.log(`DB is Connected at the  music Database`))
.catch(error=>console.log('DB is not Connected ',error))

app.use(cors({
    origin: 'http://localhost:3000', //  frontend URL
  }));
app.use(express.json());
// Serve static files for cover images and audio files
app.use('/photos', express.static(path.join(__dirname, 'photos')));
app.use('/songs-audio', express.static(path.join(__dirname, 'songs-audio')));


app.use('/auth',authRouter);
app.use('/songs',songsRouter);
app.use('/user',userRouter)