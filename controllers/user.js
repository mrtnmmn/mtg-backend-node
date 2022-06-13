import { MongoClient, ServerApiVersion } from 'mongodb';
import { User } from '../models/user.js'
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import Joi from 'joi';
import jwt from 'jsonwebtoken';

const schemaLogin= Joi.object({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['es','com', 'net'] } }).required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
})

async function getAll(req,res) {
    try{
        let user = await User.find();
        res.status(200).json({action:'get all', data: user}) 
        console.log(user)

    }catch(err){

        console.log(err)
        res.status(500).json({action:'get all', messaje:'error'}) 
        
    }

}

async function getUserId(req, res) {
    try { 

        let userEmail = req.body.email
        let foundUser = await User.findOne({email:userEmail})

        if (foundUser) {
            res.status(200).json({action: 'get user id', data: foundUser})
        } else { 
            res.status(300).json({action: 'get user id', messaje: 'there is no user registered with this email'})
        }
        
    } catch(err) {
        console.log(err)
        res.status(500).json({action:'get user id', messaje:'error'}) 
    }
}

async function getAllDecks(req,res) {
    try {

        let userId = req.body._id
        let foundUser = await User.findOne({_id:userId})

        if (foundUser) {
            if (foundUser.decks) {
                res.status(200).json({action: 'get all decks', data: foundUser.decks})
            } else {
                res.status(300).json({action: 'get all decks', messaje: 'the user has no decks'})
            }
        } else { 
            res.status(300).json({action: 'get all decks', messaje: 'the id provided was not correct'})
        }

    } catch(err) {
        console.log(err)
        res.status(500).json({action:'get all decks', messaje: 'error'})
    }
}

async function login(req, res){
    // Validamos los campos

    try {
        const { error, value } = await schemaLogin.validateAsync(req.body)
    }
    catch (err) { 
        return res.status(400).json({accion:'save', error:'ERROR: Validation failed'+err}) 
    }

    // Comprobar que el usuario si existe
    let existingUser = await User.findOne({email:req.body.email})
    if(!existingUser) return res.status(400).json({accion:'save', error:'ERROR: Unexisting user'}) 
   
   
    // Comprobamos si el password coincide
    const passwordValido = await bcrypt.compare(req.body.password, existingUser.password)
    if(!passwordValido) return res.status(400).json({accion:'save', error:'ERROR: Error in user/password'}) 
  
    // Creamos el token jwt (jsonwebtoken)  Ver web: https://jwt.io/
    const token = jwt.sign( 
        {
            _id: existingUser._id, 
            exp: Math.floor(Date.now() / 1000) + (60 * 60), //1 hora
        }, 
        process.env.TOKEN_SECRETO )
    res.header('auth-token', token)

    res.status(200).send({token}) 
    
}



async function register(req, res){
    // Validamos los campos
   /* try {
        const { error, value } = await schemaRegister.validateAsync(req.body)
        console.log(value)
        console.log(error)
    }
    catch (err) { 
        return res.status(400).json({accion:'save', mensaje:'error al guardar el usuario'+err}) 
    }*/

    // Comprobar que el usuario no existe antes
    try {
        let existingUser = await User.findOne({email:req.body.email})
        if(existingUser) return res.status(400).json({accion:'save', mensaje:'ERROR: user already exists'}) 
    }
    catch (err) { 
        return res.status(400).json({accion:'save', mensaje:err}) 
    }
   
    // Creamos el hash del password (nunca debemos guardar el password en texto claro)
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(req.body.password, salt)

    const user = new User(req.body)
    user.password = hashPassword

    try{
        let savedUser = await user.save();
        res.status(200).json({accion:'save', datos: savedUser}) 
    }catch(err){
        res.status(500).json({accion:'save', message:'ERROR: ' + err}) 
    }
    
}

async function addOneDeck(req, res){

    let deckId = req.body.deckId
    let userId = req.body._id

    const filter = { _id: userId };
    const update = { $push: { decks: deckId } };

    try {

        let doc = await User.findOneAndUpdate(filter, update);

        res.status(200).json({action: 'add one deck', user: doc})

        
    } catch (err) {
        res.status(500).json({accion:'add one deck', mensaje: 'Error: ' + err})
    }
}

async function deleteOneDeck(req, res) {

    let deckId = req.body.deckId
    let userId = req.body._id

    const filter = { _id: userId };
    const update = { $pull: { decks: deckId } };

    try {

        let doc = await User.findOneAndUpdate(filter, update);
        res.status(200).json({action: 'delete one deck', user: doc})

        
    } catch (err) {
        res.status(500).json({accion:'delete one deck', mensaje: 'Error: ' + err})
    }
}

async function setAdmin(req, res) {
    let userId = req.body._id 

    const filter = { _id: userId };
    const update = { admin: true };

    try {

        let doc = await User.findOneAndUpdate(filter, update);
        res.status(200).json({action: 'set admin', user: doc})
        
    } catch (err) {
        res.status(500).json({accion:'set admin', mensaje: 'Error: ' + err})
    }

} 

async function isAdmin(req, res) {
    let userId = req.body._id

    const filter = { _id: userId }

    try {
        let doc = await User.findOne(filter);
        res.status(200).json({action: 'is admin', admin: doc.admin})
    } catch (err) {
        res.status(500).json({accion:'is admin', mensaje: 'Error: ' + err})
    }
}

async function getOne(req, res) {

    let userEmail = req.body.email

    const filter = { email: userEmail}

    try {
        let doc = await User.findOne(filter);
        //res.status(200).json({action: 'get one', user: {admin: doc.admin, userId: doc._id} })
        res.status(200).json({action: 'get one', user: { admin: doc.admin, userId: doc._id} })
    } catch (err) {
        res.status(500).json({accion:'get one', mensaje: 'Error: ' + err})
    }

}

export { getAll, login, register, getUserId, getAllDecks, addOneDeck, deleteOneDeck, setAdmin, isAdmin, getOne }