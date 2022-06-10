import express from 'express';
var router = express.Router();

import * as controller from '../controllers/user.js';

router.get('/', controller.getAll)
router.post('/', controller.getOne)
router.post('/login', controller.login)
router.post('/register', controller.register)
router.post('/findByEmail', controller.getUserId)
router.post('/findAllDecks', controller.getAllDecks)
router.post('/isAdmin', controller.isAdmin)
router.delete('/deleteOneDeck', controller.deleteOneDeck)
router.put('/addOneDeck', controller.addOneDeck)
router.put('/setAdmin', controller.setAdmin)

export { router };
