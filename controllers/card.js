import { Card } from "../models/cards.js"

async function getAll(req, res) {
    try {
        let cards = await Card.find()
        res.status(200).json({action: 'get all cards', data: cards})
    } catch(err) {
        res.status(500).json({action: 'get all cards', error: 'ERROR: ' + err})
    }
}

async function addOne(req, res) {

    console.log('adding')
    
    let newCard = new Card(req.body)

    console.log('adding')
    console.log(newCard)

    try {

        let existingCard = await Card.findById(newCard._id)

        console.log(existingCard)

        if (existingCard !== null) {
            let updatedCard = await Card.findByIdAndUpdate({_id: newCard._id}, {cardQuantity: existingCard.cardQuantity + 1})
            res.status(200).json({action: 'add one card', data: updatedCard})
        } else {
            let savedCard = await newCard.save()
            res.status(200).json({action: 'add one card', data: savedCard})
        }

    } catch(err) {
        res.status(500).json({action: 'add one card', error: 'ERROR: ' + err})
    }
}

async function addOneExistingCard(req, res) {

    let id = req.body._id

    try {
        let updatedCard = await Card.findByIdAndUpdate({_id: id}, { $inc: {cardQuantity: 1 }}).exec()
        res.status(200).json({action: 'add one existing card', data: updatedCard})
    } catch (err){
        res.status(500).json({action: 'add one existing card', err: 'ERROR: ' + err})
    }

}

async function subtractOneExistingCard(req, res) {

    let id = req.body._id

    try {
        let updatedCard = await Card.findByIdAndUpdate({_id: id}, { $inc: {cardQuantity: -1 }}).exec()
        res.status(200).json({action: 'add one existing card', data: updatedCard})
    } catch (err){
        res.status(500).json({action: 'add one existing card', err: 'ERROR: ' + err})
    }

}

async function getOneFromId(req, res) {

    let id = req.body._id

    try {
        let foundCard = await Card.findById(id)
        res.status(200).json({action: 'add one existing card', data: foundCard})
    } catch (err){
        res.status(500).json({action: 'add one existing card', err: 'ERROR: ' + err})
    }

}


export { getAll, addOne, addOneExistingCard, subtractOneExistingCard, getOneFromId }