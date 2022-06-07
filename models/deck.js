import mongoose from 'mongoose'

const { Schema } = mongoose;

let DeckSchema = new Schema (
    {
        _id: {type: Schema.ObjectId, auto:true},
        deckName: String,
        user: String,
        cards: [{
            cardId: String,
            cardName: String,
            cardQuantity: Number,
            legalities: {
                standard: String,
                commander: String,
                legacy: String,
                pauper: String
            },
            cmc: Number,
            cardType: String,
            color: String
        }],
        cardCosts: {
            c0: Number,
            c1: Number,
            c2: Number,
            c3: Number,
            c4: Number,
            c5: Number
        },
        cardColors: {
            noColor: Number,
            white: Number,
            red: Number,
            blue: Number,
            green: Number, 
            black: Number,
            multicolor: Number
        },
        cardTypes: {
            basicLand: Number,
            land: Number,
            creature: Number,
            instant: Number,
            sorcery: Number,
            enchantment: Number,
            artifact: Number, 
            other: Number
        },
        landsColors: {
            noColor: Number,
            white: Number,
            red: Number,
            blue: Number,
            green: Number, 
            black: Number,
            multicolor: Number
        },
        deckLegality: String
    }
)

const Deck = mongoose.model("Deck", DeckSchema)

export { Deck }