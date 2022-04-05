import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';

import { router as routerRandom } from './routers/random.js'
import { router as routerUsers } from './routers/user.js'

dotenv.config();
var app = express();
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(cors())
app.use(morgan('dev'))

app.use('/random', routerRandom)
app.use('/users', routerUsers)


app.get('/', (req, res) => { res.send('Bienvenido a nuestro backend') })

const run = async () => {
    await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    await app.listen(process.env.PUERTO_SERVIDOR)
    console.log("Servidor arrancado")
}

run().catch(err => console.log('Fallo al arrancar:' + err))