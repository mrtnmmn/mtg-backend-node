import mongoose from 'mongoose';
const { Schema } = mongoose;

let UsersSchema = new Schema(
    {
        _id: {type: Schema.ObjectId, auto:true},
        username: String,
        email: String,
        password: String,
    }
)

const Users = mongoose.model("Users", UsersSchema);

export { Users };