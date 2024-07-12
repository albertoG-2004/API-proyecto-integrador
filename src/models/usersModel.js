import mongoose from "mongoose";

const usersSchema = mongoose.Schema({
    id: {type:String, required: true},
    name: {type: String, require: true, maxLength: 50},
    last_name: {type: String, required: true, maxLength: 25},
    sur_name: {type: String, required: true, maxLength: 25},
    phone_number: {type: String, required: true, maxLength: 10},
    email: {type: String, required: true, maxLength: 50},
    password :{type:String, required: true, minLength:8, maxLength: 150}
})

export default mongoose.model('user', usersSchema);