import mongoose from "mongoose";

const {Schema} = mongoose 

let PurchaseOrderSchema = new Schema (
    {
        _id: {type: Schema.ObjectId, auto:true},
        deckIds: [String],
        cardIds: [String],
        userId: String 
    }
)

const PurchaseOrder = mongoose.model("PurchaseOrder", PurchaseOrderSchema)

export { PurchaseOrder }