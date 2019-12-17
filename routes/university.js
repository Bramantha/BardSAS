const express = require('express');
const UniversityController = require('../controller/university')
const router = express.Router();

router.get('/:idAdmin', UniversityController.viewHome);
router.get('/:idAdmin/record', UniversityController.viewProgramme);
router.get('/:idAdmin/list', UniversityController.listApplication);
router.get('/:idAdmin/change', UniversityController.changeStatus);
router.get('/:idAdmin/edit/:idProgram', UniversityController.viewEditProgramme);
router.get('/:idAdmin/review', UniversityController.reviewApplication);
router.get('/:idAdmin/:idUniv/program', UniversityController.addProgramme);

router.post('/:idAdmin/:idUniv/add', UniversityController.doAddProgramme);

router.put('/:idAdmin/edit/:idProgram', UniversityController.doEditPorgramme);

router.delete('/:idAdmin/:idProgram', UniversityController.doDeletePorgramme);

module.exports = router;