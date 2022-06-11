import mongoose from "mongoose";

const {Schema} = mongoose 

let CardSchema = new Schema (
    {
        _id: String,
        cardQuantity: Number,
        cardName: String,
        cardPrice: Number
    }
)

const Card = mongoose.model("Card", CardSchema)

export { Card }