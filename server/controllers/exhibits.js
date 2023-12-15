import Exhibit from '../models/Exhibit.js';
import path, {dirname} from 'path';
import { fileURLToPath } from 'url';

//Create Exhibit
export const createExhibit = async (req, res) => {
    try {
        const {title, description, date} = req.body;

        if (req.files){
            let fileName = Date.now().toString() + req.files.image.name;
            const __dirname = dirname(fileURLToPath(import.meta.url));
            req.files.image.mv(path.join(__dirname, '..', 'uploads', fileName));

            const newExhibitWithImage = new Exhibit({
                title, description, date,
                imgUrl: fileName,
            });

            await newExhibitWithImage.save();
            return res.json({newExhibitWithImage, message: 'Exhibit added successfully.'});
        }

        const newExhibitWithoutImage = new Exhibit({
            title, description, date,
            imgUrl: '',
        });
        await newExhibitWithoutImage.save();
        return res.json({newExhibitWithoutImage, message: 'Exhibit added successfully.'});

    } catch (error) {
        res.json({message: "Error during creation exhibit."});
        console.log(error);
    }
}

//Get All Exhibits
export const getAll = async (req, res) => {
    try {
        const exhibits = await Exhibit.find();
        if (!exhibits){
            return res.json({message: "There is no exhibits."});
        }
        res.json({exhibits});
    } catch (error) {
        res.json({message: "Error during getting list of exhibits."});
        console.log(error);
    }
}

//Get Exhibit By Id
export const getById = async (req, res) => {
    try {
        const exhibit = await Exhibit.findById(req.params.id);
        if (!exhibit){
            return res.json({message: "There is no such exhibit."});
        }
        res.json({exhibit});
    } catch (error) {
        res.json({message: "Error during getting exhibit."});
        console.log(error);
    }
}

//Remove Exhibit
export const removeExhibit = async (req, res) => {
    try {
        const exhibit = await Exhibit.findByIdAndDelete(req.params.id);
        if (!exhibit){
            return res.json({message: "There is no such exhibit."});
        }
    } catch (error) {
        res.json({message: "Error during removing exhibit."});
        console.log(error);
    }
}