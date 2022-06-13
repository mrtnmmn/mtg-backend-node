import express from 'express'
var router = express.Router()

import * as controller from '../controllers/card.js'

router.get('/', controller.getAll)
router.post('/', controller.addOne)
router.post('/addOne', controller.addOneExistingCard)
router.post('/subtractOne', controller.subtractOneExistingCard)
router.post('/getOneFromId', controller.getOneFromId)

export { router }