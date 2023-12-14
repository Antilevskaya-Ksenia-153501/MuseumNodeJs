import Exhibit from '../models/Exhibit.js';
import path, {dirname} from 'path';
import { fileURLToPath } from 'url';

//Create exhibit
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