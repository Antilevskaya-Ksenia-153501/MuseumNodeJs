import {Router} from 'express';
import {createVacancy, getAll} from '../controllers/vacancies.js';

const router = new Router();

//Create Vacancy
router.post('/create', createVacancy);

//Get All Vacancies
router.get('/getVacancies', getAll);

export default router;