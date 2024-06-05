import mongoose, { Schema } from "mongoose";

const storeSchema = mongoose.Schema({
    name: {
        type: String,
    },
    direction: {
        type: String,
    },
    score: {
        type: String,
    },
    imgUrl: {
        type: String,
    },
    coordenadas:{
        type: String,
    },
    estado:{
        type: Boolean,
        default: true
    }
})

export default mongoose.model('Store', storeSchema)