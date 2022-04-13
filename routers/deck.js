import express from 'express'
var router = express.Router()

import * as controller from '../controllers/deck.js'

router.get('/getByUser', controller.getAllFromUser)
router.get('/', controller.getAll)

export { router }