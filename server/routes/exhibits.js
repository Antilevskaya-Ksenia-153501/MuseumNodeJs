import {Router} from 'express';
import {createExhibit, getAll, getById, removeExhibit} from '../controllers/exhibits.js'

const router = new Router();

//Create Exhibit
router.post('/create', createExhibit);

//Get All Exhibits
router.get('/getExhibits', getAll);

//Get Exhibit By Id 
router.get('/:id', getById);

//Remove Exhibit
router.delete('/delete/:id', removeExhibit);

export default router;