const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const {Board} = require('../db');

try {
  fs.readdirSync('uploads');
} catch (error) {
  console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
  fs.mkdirSync('uploads');
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({storage: storage});

router.post('/upload', upload.single('file'), function (req, res) {
  try {
    const {title, content, name, email} = req.body;
    Board.create({title, content, name, email, filename: req.file.filename});
    res.send('File uploaded successfully!');
  } catch (e) {
    console.log(e);
  }
});

router.post('/uploads', upload.array('files', 10), function (req, res) {
  console.log(req.files);
  res.send('Files uploaded successfully!');
});

module.exports = router;