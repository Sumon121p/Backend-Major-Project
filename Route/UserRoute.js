const express = require('express');
const router = express.Router();
const passport = require("passport");

const {signup, login, logout} = require("./../Controller/UserController");

router.post('/signup', signup);
router.post('/login', passport.authenticate('local'), login)
router.get('/logout', logout)

module.exports = router;