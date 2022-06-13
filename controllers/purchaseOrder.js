import { PurchaseOrder } from "../models/purchaseOrder.js"
import { Deck } from '../models/deck.js'
import { Card } from "../models/cards.js"

async function getAll(req, res) {
    try {
        let purchases = await PurchaseOrder.find()
        res.status(200).json({action: 'get all purchase orders', data: purchases})
    } catch(err) {
        res.status(500).json({action: 'get all purchase orders', error: 'ERROR: ' + err})
    }
}

async function addOne(req, res) {

    let newPurchaseOrder = new PurchaseOrder(req.body)

    try {
        let savedPurchaseOrder = await newPurchaseOrder.save()
        res.status(200).json({action: 'add one purchase', data: savedPurchaseOrder})
    } catch (err) {
        res.status(500).json({action: 'add one purchase', err: "ERROR: " + err})
    }

}

async function deleteOne(req, res) {
    
    let purchaseId = req.body._id
    let purchaseType = req.body.purchaseType

    console.log('deleting')
    console.log(purchaseId)

    try {
        if (purchaseType === 'deck') {

            console.log('deleting deck')

            //find comlplete selected deck
            let completeDeleteDeck = await Deck.findById(purchaseId)
            
            //substract each card 
            completeDeleteDeck.cards.forEach(deckCard => {

                console.log(deckCard.cardName)

                for (let i = 0; i < deckCard.cardQuantity; i++ ) {
                    try {
                        let updatedCard = Card.findOneAndUpdate({_id: deckCard.cardId}, { $inc: {cardQuantity: -1 }}).exec()
                        console.log('update card: ' + updatedCard)
                    } catch (err) {
                        console.log(err)
                    }
                }
                
            });

            let deletedPurchase = await PurchaseOrder.findByIdAndDelete(purchaseId)
            res.status(200).json({action: 'delete one purchase', data: deletedPurchase})
        } else {
            let updatedCard = await Card.findByIdAndUpdate({_id: purchaseId}, { $inc: {cardQuantity: -1 }}).exec()
            let deletedPurchase = await PurchaseOrder.findByIdAndDelete(purchaseId)
            res.status(200).json({action: 'delete one purchase', data: updatedCard})
        }
    } catch(err) {
        res.status(500).json({action: 'delete one purchase', err: "ERROR: " + err})
    }

}

async function checkStock(req, res) {

    let purchaseId = req.body._id
    let purchaseType = req.body.purchaseType

    let stock = true

    try {
        if (purchaseType === 'deck') {
            //find comlplete selected deck
            let completeDeleteDeck = await Deck.findById(purchaseId)
            
            //substract each card 
            for (const deckCard of completeDeleteDeck.cards) {

                let card = await Card.findById(deckCard.cardId)

                if (card !== null) {
                    if (card.cardQuantity < deckCard.cardQuantity) {

                        console.log('less')
                        stock = false
                    }
                } else {
                    stock = false
                }
            }
            res.status(200).json({action: 'checkStock', data: stock})
        } else {
            console.log('cehcking card')
            let card = await Card.findById(purchaseId)
            console.log(card)
            if (card !== null) {
                if (card.cardQuantity === 0 ) {
                    stock = false
                }
            } else {
                stock = false
            }
            res.status(200).json({action: 'checkStock', data: stock})
        }
    } catch(err) {
        res.status(500).json({action: 'checkStock', err: "ERROR: " + err})
    }

}

export { getAll, addOne, deleteOne, checkStock }