import express from 'express';
var router = express.Router();

import * as controller from '../controllers/user.js';

router.get('/', controller.getAll)
router.post('/login', controller.login)
router.post('/register', controller.register)

export { router };
