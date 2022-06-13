import mongoose from "mongoose";

const {Schema} = mongoose 

let PurchaseOrderSchema = new Schema (
    {
        _id: String,
        purchaseType: String
    }
)

const PurchaseOrder = mongoose.model("PurchaseOrder", PurchaseOrderSchema)

export { PurchaseOrder }