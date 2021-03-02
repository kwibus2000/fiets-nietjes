const express = require('express')
const { getNietjes, addNietje } = require('../controllers/nietjes')

const router = express.Router()

router.route('/').get(getNietjes).post(addNietje)

module.exports = router
