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

    let newPurchaseOrder = new PurchaseOrder(req.body.order)

    try {
        let savedPurchaseOrder = await newPurchaseOrder.save()
        res.status(200).json({action: 'add one purchase', data: savedPurchaseOrder})
    } catch (err) {
        res.status(500).json({action: 'add one purchase', err: "ERROR: " + err})
    }

}

async function deleteOne(req, res) {
    
    let purchaseId = req.body._id

    let purchaseOrder = await PurchaseOrder.findById(purchaseId)

    try {
        for (const deckId of purchaseOrder.deckIds ) {
            //find comlplete selected deck
            let completeDeleteDeck = await Deck.findById(deckId)
            
            //substract each card 
            for (const deckCard of completeDeleteDeck.cards) {
                for (let i = 0; i < deckCard.cardQuantity; i++ ) {
                    try {
                        let updatedCard = await Card.findOneAndUpdate({_id: deckCard.cardId}, { $inc: {cardQuantity: -1 }}).exec()
                    } catch (err) {
                        console.log(err)
                    }
                }
            }
            /*
            completeDeleteDeck.cards.forEach(deckCard => {

                for (let i = 0; i < deckCard.cardQuantity; i++ ) {
                    try {
                        let updatedCard = Card.findOneAndUpdate({_id: deckCard.cardId}, { $inc: {cardQuantity: -1 }}).exec()
                    } catch (err) {
                        console.log(err)
                    }
                }
            });
            */
        }

        for (const cardId of purchaseOrder.cardIds) {
            let updatedCard = await Card.findByIdAndUpdate({_id: cardId}, { $inc: {cardQuantity: -1 }}).exec()
        }

        let deletedPurchase = await PurchaseOrder.findByIdAndDelete(purchaseId)

        res.status(200).json({action: 'delete one purchase', data: 'success'})
    } catch(err) {
        res.status(500).json({action: 'delete one purchase', err: "ERROR: " + err})
    }

}

async function checkStock(req, res) {

    let purchaseId = req.body._id

    let purchaseOrder = await PurchaseOrder.findById(purchaseId)

    let stock = true

    try {

        console.log(purchaseOrder)

        if (purchaseOrder.deckIds !== null && purchaseId !== purchaseOrder.deckIds !== []) {
            for (const deckId of purchaseOrder.deckIds ) {
                //find comlplete selected deck
                let completeDeleteDeck = await Deck.findById(deckId)
                
                if (completeDeleteDeck !== null) {
                    //substract each card 
                    for(const deckCard of completeDeleteDeck.cards) {
    
                        let card = await Card.findById(deckCard.cardId)
    
                        if (card !== null) {
                            if (card.cardQuantity < deckCard.cardQuantity) {
                                stock = false
                            }
                        } else {
                            stock = false
                        }
                    };
                }
            }
        }

        if (purchaseOrder.cardIds) {
            for (const cardId of purchaseOrder.cardIds) {
                let card = await Card.findById(cardId)
                if (card !== null) {
                    if (card.cardQuantity === 0 ) {
                        stock = false
                    }
                } else {
                    stock = false
                }
            }
        }
        res.status(200).json({action: 'check stock', data: stock})
    } catch(err) {
        res.status(500).json({action: 'check stock', err: "ERROR: " + err})
    }
}

export { getAll, addOne, deleteOne, checkStock }