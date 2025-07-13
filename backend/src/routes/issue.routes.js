const express = require('express');
const router = express.Router();
const issueController = require('../controllers/issue.controller');
const { validateIssue, validateProjectId } = require('../middleware/validation');

router.get('/', issueController.getAllIssues);
router.post('/:projectId', validateProjectId, validateIssue, issueController.createIssue);
router.get('/:id', issueController.getIssueById);
router.put('/:id', validateIssue, issueController.updateIssue);
router.delete('/:id', issueController.deleteIssue);

module.exports = router;
