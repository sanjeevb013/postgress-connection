// Global error handling middleware
const errorHandler = (err, req, res, next) => {
  console.error(err);

  // Multer file size limit error
  if (err && err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({ error: 'File too large. Maximum allowed size is 10 MB.' });
  }

  // Multer invalid file type or other Multer errors
  if (err && err.code && err.code.startsWith('LIMIT_')) {
    return res.status(400).json({ error: err.message });
  }

  // Validation errors or custom errors
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";

  res.status(status).json({
    error: {
      status,
      message,
    },
  });
};

module.exports = errorHandler;
