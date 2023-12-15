import mongoose from "mongoose";

const HallSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    area: {
        type: Number,
        required: true,
    },
    imgUrl: {
        type: String,
        default: '',
    },
});

export default mongoose.model('Hall', HallSchema);