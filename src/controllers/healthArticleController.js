const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const path = require('path');

// Create a new health article
exports.createArticle = async (req, res) => {
  try {
    // multer puts file info on req.file
    const file = req.file;
    const { title, summary, content } = req.body;

    if (!title || !summary || !content) {
      return res.status(400).json({ error: 'title, summary and content are required' });
    }

    // Accept either an uploaded file (req.files or req.file) or a provided fileUrl in the JSON body
    let fileUrl = null;

    // multer with upload.fields puts files into req.files
    let uploadedFile = null;
    if (req.file) {
      uploadedFile = req.file;
    } else if (req.files) {
      // prefer 'file' then 'fileUrl' as file field
      if (req.files.file && req.files.file.length) uploadedFile = req.files.file[0];
      else if (req.files.fileUrl && req.files.fileUrl.length) uploadedFile = req.files.fileUrl[0];
    }

    if (uploadedFile) {
      fileUrl = `/uploads/${uploadedFile.filename}`;
    } else if (req.body.fileUrl) {
      // allow full URL or relative path; normalize to start with '/uploads' if user provided filename only
      let provided = req.body.fileUrl;
      if (!provided.startsWith('http') && !provided.startsWith('/')) {
        provided = `/uploads/${provided}`;
      }
      fileUrl = provided;
    }

    const article = await prisma.healthArticle.create({
      data: {
        title,
        summary,
        content,
        fileUrl,
      }
    });

    // Build full URL for the uploaded file when returning
    const fullFileUrl = fileUrl ? (fileUrl.startsWith('http') ? fileUrl : `${req.protocol}://${req.get('host')}${fileUrl}`) : null;

    res.status(201).json({ message: 'HealthArticle created', article: { ...article, fileUrl: article.fileUrl, fileUrlFull: fullFileUrl } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get all articles
exports.getAll = async (req, res) => {
  try {
    const articles = await prisma.healthArticle.findMany({ orderBy: { createdAt: 'desc' } });
    // attach full URL for each file
    const data = articles.map(a => ({
      ...a,
      fileUrlFull: a.fileUrl ? `${req.protocol}://${req.get('host')}${a.fileUrl}` : null
    }));
    res.json({ data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get article by ID
exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const article = await prisma.healthArticle.findUnique({ where: { id: parseInt(id) } });
    if (!article) return res.status(404).json({ error: 'Article not found' });
    res.json({ data: { ...article, fileUrlFull: article.fileUrl ? `${req.protocol}://${req.get('host')}${article.fileUrl}` : null } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
