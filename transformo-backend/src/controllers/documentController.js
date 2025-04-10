const path = require('path');
const multer = require('multer');

const { 
    extractTextFromImage, 
    extractTextFromPDF, 
    extractTextFromWord, 
    saveTextAsJSON, 
    saveTextAsXML 
} = require('../services/documentService');

// Configure Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads/'));  // Set upload folder
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);  // Unique filename
    }
});

const upload = multer({ storage: storage });  // Initialize multer

// Extract Text API
exports.extractText = [
    upload.single('file'),  // Middleware to handle file upload
    async (req, res) => {
        try {
            if (!req.file) {
                return res.status(400).json({ message: 'No file uploaded' });
            }

            const filePath = path.resolve(req.file.path);
            const fileName = path.parse(req.file.originalname).name;
            const format = req.body.format || 'json';
            const outputFilePath = path.join(__dirname, `../outputs/${fileName}.${format}`);

            let extractedText = '';

            if (req.file.mimetype === 'application/pdf') {
                extractedText = await extractTextFromPDF(filePath);
            } else if (req.file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
                extractedText = await extractTextFromWord(filePath);
            } else if (req.file.mimetype.startsWith('image/')) {
                extractedText = await extractTextFromImage(filePath);
            }

            if (format === 'json') {
                await saveTextAsJSON(extractedText, outputFilePath);
            } else if (format === 'xml') {
                await saveTextAsXML(extractedText, outputFilePath);
            }

            res.status(200).json({ message: 'File processed successfully', path: outputFilePath });
        } catch (error) {
            console.error('Error extracting text:', error);
            res.status(500).json({ message: 'Failed to process file', error });
        }
    }
];
