const multer = require('multer');
const path = require('path');

// Storage config - save files to /uploads with timestamp prefix
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), 'uploads'));
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const name = `${Date.now()}-${file.fieldname}${ext}`;
    cb(null, name);
  }
});

// File filter - accept images and pdfs only (you can adjust)
function fileFilter(req, file, cb) {
  const allowed = /jpeg|jpg|png|gif|pdf/;
  const mimetype = allowed.test(file.mimetype);
  const extname = allowed.test(path.extname(file.originalname).toLowerCase());
  if (mimetype && extname) {
    return cb(null, true);
  }
  cb(new Error('Invalid file type. Only images and PDFs are allowed.'));
}

// 10 MB limit
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter
});

module.exports = upload;
