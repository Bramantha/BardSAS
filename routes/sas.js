const express = require('express');
const SasController = require('../controller/sas')
const router = express.Router();

router.get('', SasController.viewHome);
router.get('/maintain', SasController.viewMaintain);
router.get('/add', SasController.addQualification);
router.get('/register', SasController.registerUniversity);
router.get('/new/:id', SasController.addNewUniversity);
router.get('/edit/:id', SasController.editQualification);

router.get('/university/admin/:id', SasController.viewAdminList);
// router.get('/university/edit/:id', SasController.editUniversity);

router.post('/add', SasController.doAddQualification);
router.post('/university/add', SasController.doAddUniversity);
router.post('/university/admin/:id', SasController.doAddAdminUniversity);

router.put('/edit/:id', SasController.doEditQualification);

router.delete('/:id', SasController.doDeleteQualification);
// router.delete('/university/:id', SasController.doDeleteUniversity);



module.exports = router;