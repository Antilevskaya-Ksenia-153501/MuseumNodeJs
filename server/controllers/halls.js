import Hall from '../models/Hall.js';
import path, {dirname} from 'path';
import { fileURLToPath } from 'url';

//Create Hall
export const createHall = async (req, res) => {
    try {
        const {title, description, area} = req.body;

        if (req.files){
            let fileName = Date.now().toString() + req.files.image.name;
            const __dirname = dirname(fileURLToPath(import.meta.url));
            req.files.image.mv(path.join(__dirname, '..', 'uploads', fileName));

            const newHallWithImage = new Hall({
                title, description, area,
                imgUrl: fileName,
            });

            await newHallWithImage.save();
            return res.json({newHallWithImage, message: 'Hall added successfully.'});
        }

        const newHallWithoutImage = new Hall({
            title, description, area,
            imgUrl: '',
        });
        await newHallWithoutImage.save();
        return res.json({newHallWithoutImage, message: 'Hall added successfully.'});

    } catch (error) {
        res.json({message: "Error during creation hall."});
        console.log(error);
    }
}

//Get All Halls
export const getAll = async (req, res) => {
    try {
        const halls = await Hall.find();
        if (!halls){
            return res.json({message: "There is no halls."});
        }
        res.json({halls});
    } catch (error) {
        res.json({message: "Error during getting list of halls."});
        console.log(error);
    }
}
