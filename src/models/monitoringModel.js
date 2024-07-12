import mongoose from "mongoose";

const monitoringSchema = new mongoose.Schema({
    id: {type: String, required: true},
    date: {type: Date, required: true},
    temperature: {type: Number, required: true},
    humidity: {type: Number, required: true},
    weight: {type: Number, required: true},
})

export default mongoose.model('monitoring', monitoringSchema);