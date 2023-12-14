import mongoose from "mongoose";

const ExhibitSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    imgUrl: {
        type: String,
        default: '',
    },
});

export default mongoose.model('Exhibit', ExhibitSchema);