import {Router} from 'express';
import {createExhibit} from '../controllers/exhibits.js'

const router = new Router();

//Create exhibit
router.post('/create', createExhibit);

export default router;