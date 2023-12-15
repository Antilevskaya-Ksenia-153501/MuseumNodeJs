import {Router} from 'express';
import {createExhibit, getAll} from '../controllers/exhibits.js'

const router = new Router();

//Create exhibit
router.post('/create', createExhibit);

//Get list of exhibits
router.get('/getExhibits', getAll);

export default router;