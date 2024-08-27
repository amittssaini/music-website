const router = require('express').Router();
const {postSignup,postSignin} =require('../Controllers/auth.controller')
router.post('/signup',postSignup);
router.post('/signin',postSignin)
module.exports = router;