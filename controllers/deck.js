import { Deck } from '../models/deck.js'

async function getAll(req, res) {

    try {
        let decks = await Deck.find()
        res.status(200).json({action: 'get All', data: decks})
    } catch(err) {
        res.status(500).json({action: 'get All', error: err})
    }

}

async function getOneFromId(req, res) {

    let deckId = req.body._id

    try {
        let deck = await Deck.findById(deckId)
        res.status(200).json({action: 'get one from id', data: deck})
    } catch(err) {
        res.status(500).json({action: 'get one from id', error: err})
    }

}

async function getAllFromUser(req,res) {

    let userId = req.body._id

    try {
        let decks = await Deck.find({user: userId})
        res.status(200).json({action: 'getAllFromUser', data: decks})
    } catch(err) {
        res.status(500).json({action: 'getAllFromUser', error: err})
    }
}

async function addOne(req,res) {

    const newDeck = new Deck(req.body.deck)
    const editing = req.body.editing

    try {

        if (editing) {
            let deletedDeck = await Deck.findByIdAndDelete(req.body.deck._id)
            let savedDeck = await newDeck.save()
            res.status(200).json({action: 'add one deck', data: savedDeck})
        } else {
            let savedDeck = await newDeck.save()
            res.status(200).json({action: 'add one deck', data: savedDeck})
        }

    } catch (err) {
        res.status(500).json({action: 'add one deck', error: 'ERROR: ' + err})
    }

}

async function deleteOne(req, res) {

    const _id = req.body._id

    try {
        let deletedDeck = await Deck.findByIdAndDelete(_id)
        res.status(200).json({action: 'delete one deck', data: deletedDeck})
    } catch (err) {
        res.status(500).json({action: 'delete one deck', message: 'ERROR: ' + err})
    }

}

async function updateName(req, res) {

    const id = req.body._id 
    const newName = req.body.name

    try {
        let updatedDeck = await Deck.findOneAndUpdate({_id: id}, {deckName: newName})
        res.status(200).json({action: 'update name', data: updatedDeck})
    } catch (err) {
        res.status(500).json({action: 'update name', error: err})
    }

}

async function updateCards(req, res) {

    const id =  req.body._id
    const cards = req.body.cards 

    try {
        let updatedDeck = await Deck.findOneAndUpdate({_id: id}, {cards: cards})
        res.status(200).json({action: 'update cards', data: updatedDeck})
    } catch (err) {
        res.status(500).json({action: 'update cards', error: err})
    }
}

export { getAll, getAllFromUser, addOne, deleteOne, getOneFromId, updateName, updateCards }