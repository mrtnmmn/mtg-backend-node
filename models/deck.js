import mongoose from 'mongoose'

const { Schema } = mongoose;

let DeckSchema = new Schema (
    {
        _id: {type: Schema.ObjectId, auto:true},
        deckName: String,
        cards: [String],
        user: {type: Schema.ObjectId, ref: 'User'}
    }
)

const Deck = mongoose.model("Deck", DeckSchema)

export { Deck }