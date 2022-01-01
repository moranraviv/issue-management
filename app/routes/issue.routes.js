const express = require('express');
const issuesValidator = require('../controllers/issue.validator');
const issueController = require('../controllers/issue.controller'); 

const router  = express.Router(); 

router.get('/', issuesValidator.getByQueryParamValidationRules(), issuesValidator.validate, issueController.getByQueryParams); 
router.post('/', issuesValidator.createAndUpsertValidationRules(), issuesValidator.validate, issueController.create); 
router.patch('/', issuesValidator.createAndUpsertValidationRules(), issuesValidator.validate, issueController.upsert); 
router.put('/:id', issuesValidator.updateValidationRules(), issuesValidator.validate, issueController.update);

module.exports = router;