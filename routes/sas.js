const express = require('express');
const SasController = require('../controllers/sas')
const router = express.Router();

router.get('', SasController.viewHome);
router.get('/maintain', SasController.viewMaintain);
router.get('/add', SasController.addQualification);
router.get('/register', SasController.registerUniversity);
router.get('/new/:id', SasController.addNewUniversity);
router.get('/edit/:id', SasController.editQualification);

router.get('/university/admin/:id', SasController.viewAdminList);
router.get('/university/edit/:id', SasController.editUniversity);
router.get('/university/admin/edit/:idAdmin/:idUniv', SasController.editAdminUniversity);

router.post('/add', SasController.doAddQualification);
router.post('/university/add', SasController.doAddUniversity);
router.post('/university/admin/:id', SasController.doAddAdminUniversity);

router.put('/edit/:id', SasController.doEditQualification);
router.put('/university/edit/:id', SasController.doEditUniversity);
router.put('/university/admin/edit/:idAdmin/:idUniv', SasController.doEditAdminUniversity);

router.delete('/:id', SasController.doDeleteQualification);
router.delete('/university/:id', SasController.doDeleteUniversity);
router.delete('/university/admin/:idAdmin/:idUniv', SasController.doDeleteAdminUniversity);



module.exports = router;