const { validationResult } = require('express-validator');

// Middleware to handle validation result from express-validator
function handleValidation(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

module.exports = handleValidation;
