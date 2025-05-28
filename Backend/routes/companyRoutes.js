const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload.js');
const { createCompany, listCompany, findCompany, companyLocation } = require('../controller/companyController');
const companyRating  = require('../controller/companyRating')

router.post('/companyList', upload.single('logo'), createCompany);
router.post('/specficCompany', findCompany)
router.post('/location', companyLocation)
router.post('/rating', companyRating)

router.get('/showcompanyList', listCompany)

module.exports = router;