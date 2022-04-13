import { Deck } from '../models/deck.js'
import { User } from '../models/user.js'

async function getAll(req, res) {

    try {
        let decks = await Deck.find()
        res.status(200).json({action: getAll, data: decks})
    } catch(err) {
        console.log(err)
    }

}

async function getAllFromUser(req,res) {

    let userId = req.params.userId

    try {
        let user = await User.findById(userId)
        console.log(user.Deck)
        res.status(200).json({action: 'getAllFromUser'})
    } catch(err) {
        console.log(err)
        res.status(500).json({action: 'getAllFromUser', error: err})
    }
}

async function addDeck(req,res) {

}

export { getAll, getAllFromUser }