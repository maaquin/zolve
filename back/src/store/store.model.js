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
<<<<<<< HEAD
=======
    avatarUrl: {
        type: String,
    },
>>>>>>> 370a30cc00298b3a5cec866d0798fe32dff9659e
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