import {Router} from 'express';
import {createExhibit, getAll, getById, removeExhibit, updateExhibit} from '../controllers/exhibits.js';

const router = new Router();

//Create Exhibit
router.post('/create', createExhibit);

//Get All Exhibits
router.get('/getExhibits', getAll);

//Get Exhibit By Id 
router.get('/:id', getById);

//Remove Exhibit
router.delete('/delete/:id', removeExhibit);

//Update Exhibit
router.put('/update/:id', updateExhibit);

export default router;