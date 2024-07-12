import mongoose from "mongoose";

const bananaSchema = mongoose.Schema({
    id: {type: String, required: true},
    date: {type: Date, required: true},
    color: {type: String, required: true},
    classification: {type: String, required: true}
})

export default mongoose.model('banana', bananaSchema); 