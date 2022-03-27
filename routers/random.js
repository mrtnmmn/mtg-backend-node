import express from 'express';
var router = express.Router();

import * as controller from '../controllers/random.js';

router.get('/', controller.getOne)


export { router };
