const express = require('express');
const UniversityController = require('../controller/university')
const router = express.Router();

router.get('', UniversityController.viewHome);
router.get('/record', UniversityController.viewProgramme);
router.get('/program', UniversityController.addProgramme);
router.get('/review', UniversityController.reviewApplication);
router.get('/list', UniversityController.listApplication);
router.get('/change', UniversityController.changeStatus);
router.post('/add', UniversityController.doAddProgramme);
router.delete('/:id', UniversityController.doDeleteProgramme);
// router.put('/edit/:id', UniversityController.doEditProgramme);

module.exports = router;