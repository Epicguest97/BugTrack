const validateIssue = (req, res, next) => {
  const { title, description, status } = req.body;
  
  // Title is required
  if (!title || title.trim().length === 0) {
    return res.status(400).json({ error: 'Title is required' });
  }
  
  // Validate status if provided
  const validStatuses = ['TO_DO', 'IN_PROGRESS', 'IN_REVIEW', 'DONE'];
  if (status && !validStatuses.includes(status)) {
    return res.status(400).json({ 
      error: `Invalid status. Valid statuses are: ${validStatuses.join(', ')}` 
    });
  }
  
  next();
};

const validateProjectId = (req, res, next) => {
  const { projectId } = req.params;
  
  if (!projectId || projectId.trim().length === 0) {
    return res.status(400).json({ error: 'Project ID is required' });
  }
  
  next();
};

module.exports = {
  validateIssue,
  validateProjectId
};
