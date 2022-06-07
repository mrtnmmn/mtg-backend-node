import express from 'express'
var router = express.Router()

import * as controller from '../controllers/deck.js'

router.get('/', controller.getAll)
router.post('/', controller.addOne)
router.post('/getByUser', controller.getAllFromUser)
router.post('/getOneFromId', controller.getOneFromId)
router.post('/updateCards', controller.updateCards)
router.delete('/', controller.deleteOne)
router.put('/updateName', controller.updateName)

export { router }