const passport = require('passport')
const express = require('express')
const controller = require('../controllers/analitics')
const router =  express.Router()

router.get('/overview', passport.authenticate('jwt', {session: false}), controller.overview)

router.get('/analitics', passport.authenticate('jwt', {session: false}), controller.analitics)


module.exports = router