import { Card } from "../models/cards.js"

async function getAll(req, res) {
    try {
        let cards = await Card.find()
        res.status(200).json({action: 'get all cards', data: cards})
    } catch(err) {
        console.log(err)
        res.status(500).json({action: 'get all cards', error: 'ERROR: ' + err})
    }
}

async function addOne(req, res) {
    
    let newCard = new Card(req.body)

    console.log(newCard)

    try {

        let existingCard = await Card.findById(newCard._id)

        console.log(existingCard)

        if (existingCard !== null) {
            let updatedCard = await Card.findByIdAndUpdate({_id: newCard._id}, {cardQuantity: existingCard.cardQuantity + 1})
            res.status(200).json({action: 'add one card', data: updatedCard})
        } else {
            console.log('saving')
            let savedCard = await newCard.save()
            res.status(200).json({action: 'add one card', data: savedCard})
        }

    } catch(err) {
        res.status(500).json({action: 'add one card', error: 'ERROR: ' + err})
    }
}

export { getAll, addOne }