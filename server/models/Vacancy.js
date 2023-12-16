import mongoose from "mongoose";

const VacancySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    salary: {
        type: Number,
        required: true,
    },
});

export default mongoose.model('Vacancy', VacancySchema);