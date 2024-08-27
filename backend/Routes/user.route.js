const router = require('express').Router();
const {postSong,getUsers,getPlaylist} = require('../Controllers/user.controller')
router.get('/',getUsers);
router.get('/playlist',getPlaylist)
router.post('/playlist',postSong)

module.exports = router;