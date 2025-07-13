const issueService = require('../services/issues.services');

exports.getAllIssues = async (req, res, next) => {
  try {
    const issues = await issueService.getAll();
    res.json(issues);
  } catch (err) {
    next(err);
  }
};

exports.createIssue = async (req, res, next) => {
  try {
    const issue = await issueService.create(req.params.projectId, req.body);
    res.status(201).json(issue);
  } catch (err) {
    next(err);
  }
};

exports.getIssueById = async (req, res, next) => {
  try {
    const issue = await issueService.getById(req.params.id);
    if (!issue) {
      return res.status(404).json({ error: 'Issue not found' });
    }
    res.json(issue);
  } catch (err) {
    next(err);
  }
};

exports.updateIssue = async (req, res, next) => {
  try {
    const issue = await issueService.update(req.params.id, req.body);
    res.json(issue);
  } catch (err) {
    next(err);
  }
};

exports.deleteIssue = async (req, res, next) => {
  try {
    await issueService.delete(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
