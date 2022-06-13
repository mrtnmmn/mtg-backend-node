import express from 'express'
var router = express.Router()

import * as controller from '../controllers/purchaseOrder.js'

router.get('/', controller.getAll)
router.post('/', controller.addOne)
router.post('/checkStock', controller.checkStock)
router.delete('/', controller.deleteOne)


export { router }