const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const upload = require('../middleware/upload');
const controller = require('../controllers/healthArticleController');

// POST /api/health-articles
// multipart/form-data with optional file (field name: file)
router.post(
  '/',
  // accept file under either `file` or `fileUrl` (some users named it `fileUrl` in Postman)
  upload.fields([{ name: 'file', maxCount: 1 }, { name: 'fileUrl', maxCount: 1 }]),
  [
    body('title').isString().trim().isLength({ min: 3 }).withMessage('Title must be at least 3 chars'),
    body('summary').isString().trim().isLength({ min: 10 }).withMessage('Summary must be at least 10 chars'),
    body('content').isString().trim().isLength({ min: 20 }).withMessage('Content must be at least 20 chars'),
  ],
  validate,
  controller.createArticle
);

router.get('/', controller.getAll);
router.get('/:id', controller.getById);

module.exports = router;
