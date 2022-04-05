import express from 'express';
var router = express.Router();

import * as controller from '../controllers/user.js';

router.get('/', controller.getAll)
router.get('/login', controller.login)
router.get('/register', controller.register)

export { router };
