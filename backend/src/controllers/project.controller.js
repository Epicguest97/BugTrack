const projectService = require('../services/project.services');

exports.getAllProjects = async (req, res, next) => {
  try {
    const projects = await projectService.getAll();
    res.json(projects);
  } catch (err) {
    next(err);
  }
};

exports.createProject = async (req, res, next) => {
  try {
    const project = await projectService.create(req.body);
    res.status(201).json(project);
  } catch (err) {
    next(err);
  }
};

exports.getProjectById = async (req, res, next) => {
  try {
    const project = await projectService.getById(req.params.id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json(project);
  } catch (err) {
    next(err);
  }
};

exports.updateProject = async (req, res, next) => {
  try {
    const project = await projectService.update(req.params.id, req.body);
    res.json(project);
  } catch (err) {
    next(err);
  }
};

exports.deleteProject = async (req, res, next) => {
  try {
    await projectService.delete(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

exports.getProjectStatistics = async (req, res, next) => {
  try {
    const statistics = await projectService.getStatistics(req.params.id);
    res.json(statistics);
  } catch (err) {
    next(err);
  }
};
