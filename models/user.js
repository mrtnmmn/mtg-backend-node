import mongoose from 'mongoose';
const { Schema } = mongoose;

let UsersSchema = new Schema(
    {
        _id: {type: Schema.ObjectId, auto:true},
        username: String,
        email: String,
        password: String,
        decks: [{type: Schema.ObjectId, ref: 'Deck'}]
    }
)

const User = mongoose.model("User", UsersSchema);

export { User };