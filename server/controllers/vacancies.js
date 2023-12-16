import Vacancy from '../models/Vacancy.js';

//Create Vacancy
export const createVacancy = async (req, res) => {
    try {
        const {title, description, salary} = req.body;

        const newVacancy = new Vacancy({
            title, description, salary,
        });
        await newVacancy.save();
        return res.json({newVacancy, message: 'Vacancy added successfully.'});

    } catch (error) {
        res.json({message: "Error during creation vacancy."});
        console.log(error);
    }
}

//Get All Vacancies
export const getAll = async (req, res) => {
    try {
        const vacancies = await Vacancy.find();
        if (!vacancies){
            return res.json({message: "There is no vacancies."});
        }
        res.json({vacancies});
    } catch (error) {
        res.json({message: "Error during getting list of vacancies."});
        console.log(error);
    }
}
