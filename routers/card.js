import express from 'express'
var router = express.Router()

import * as controller from '../controllers/card.js'

router.get('/', controller.getAll)
router.post('/', controller.addOne)

export { router }