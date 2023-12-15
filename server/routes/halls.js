import {Router} from 'express';
import {createHall, getAll} from '../controllers/halls.js';

const router = new Router();

//Create Hall
router.post('/create', createHall);

//Get All Halls
router.get('/getHalls', getAll);

export default router;