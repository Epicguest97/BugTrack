const logger = require('../utils/logger');

module.exports = (err, req, res, next) => {
  logger.log(`Error: ${err.message}`);
  
  // Prisma specific errors
  if (err.code === 'P2002') {
    return res.status(400).json({
      error: 'A record with this data already exists',
    });
  }
  
  if (err.code === 'P2025') {
    return res.status(404).json({
      error: 'Record not found',
    });
  }
  
  // Default error response
  res.status(err.status || 500).json({
    error: err.message || 'Something went wrong!',
  });
};
