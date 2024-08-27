const router = require('express').Router();
const {postSongs,getSongs} = require('../Controllers/songs.controller')

router.post('/',postSongs);
router.get('/',getSongs)
module.exports=router;