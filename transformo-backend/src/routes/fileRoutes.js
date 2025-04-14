const express = require('express');
const multer = require('multer');
const { uploadFile, downloadFile, saveFile, getSavedFiles, downloadFileforsave, deletesave } = require('../controllers/fileController');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/upload', authenticate, upload.single('file'), uploadFile);
router.get('/download/:fileId', authenticate, downloadFile);
router.put('/save/:fileId', authenticate, saveFile);
router.get('/savedfile', authenticate, getSavedFiles);
router.get('/downloadsaved/:savefileId',authenticate,downloadFileforsave);
router.delete('/savedfile/:fileId', authenticate,deletesave);
module.exports = router;