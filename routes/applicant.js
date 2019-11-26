const express = require('express');
const ApplicantController = require('../controller/applicant')
const router = express.Router();

router.get('', ApplicantController.viewHome);
router.get('/apply', ApplicantController.applyProgramme);
router.get('/select', ApplicantController.selectProgramme);

module.exports = router;