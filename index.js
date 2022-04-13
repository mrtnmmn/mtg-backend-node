import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';

import { router as routerRandom } from './routers/random.js'
import { router as routerUser } from './routers/user.js'
import { router as routerDeck } from './routers/deck.js'

dotenv.config();
var app = express();
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(cors())
app.use(morgan('dev'))

app.use('/random', routerRandom)
app.use('/user', routerUser)
app.use('/deck', routerDeck)

app.get('/', (req, res) => (res.status(200).json({acction:'salute', message: 'Hello! Wellcome to MagikaTG backend'})))

const run = async () => {
    await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    await app.listen(process.env.PORT || 5300)

    console.log("Servidor arrancado")
}

run().catch(err => console.log('Fallo al arrancar:' + err))