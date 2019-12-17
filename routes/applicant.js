const express = require('express');
const ApplicantController = require('../controller/applicant')
const router = express.Router();

router.get('', ApplicantController.viewHome);
router.get('/list', ApplicantController.viewProgramList);
router.get('/apply', ApplicantController.applyProgramme);
router.get('/select/:idProgram', ApplicantController.selectProgramme);
router.get('/qualification/:idProgram', ApplicantController.viewQualification);
router.get('/new-qualification/:idProgram', ApplicantController.addQualification);
router.get('/university/detail/:idUniv', ApplicantController.viewProgram);

router.post('/qualification/:idProgram', ApplicantController.doAddQualification);
router.post('/submit/:idProgram/:idQualification', ApplicantController.doAddApplication);

module.exports = router;