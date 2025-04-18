const File = require('../models/file');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs').promises;
const {
    extractTextFromPDF,
    extractTextFromImage,
    extractTextFromWord,
    saveTextAsJSON,
    saveTextAsXML,
} = require('../services/documentService');

const uploadFile = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No file uploaded.' });
        }
        const { title } = req.body;
        const fileId = uuidv4();
        const filePath = path.join(__dirname, `../uploads/${fileId}-${req.file.originalname}`);
        await fs.writeFile(filePath, req.file.buffer);
        const newFile = new File({
            fileId,
            title,
            fileName: req.file.originalname,
            filePath,
            uploadedBy: req.user.id
        });
        await newFile.save();
        res.status(201).json({ success: true, fileId });
    } catch (error) {
        console.error('Upload Error:', error);
        res.status(500).json({ success: false, message: 'Error uploading file.' });
    }
};

const downloadFile = async (req, res) => {
    try {
        const { fileId } = req.params;
        const { format } = req.query;
        const file = await File.findOne({ fileId, uploadedBy: req.user.id });
        if (!file) {
            return res.status(404).json({ success: false, message: 'File not found.' });
        }
        const ext = path.extname(file.filePath).toLowerCase();
        let extractedText = '';
        if (ext === '.pdf') {
            extractedText = await extractTextFromPDF(file.filePath);
        } else if (ext === '.docx') {
            extractedText = await extractTextFromWord(file.filePath);
        } else if (['.jpg', '.jpeg', '.png'].includes(ext)) {
            extractedText = await extractTextFromImage(file.filePath);
        } else {
            return res.status(400).json({ success: false, message: 'Unsupported file type for conversion.' });
        }
        const tempDir = path.join(__dirname, '..', 'temp');
        await fs.mkdir(tempDir, { recursive: true });
        const tempFilePath = path.join(tempDir, `${file.title}.${format}`);
        if (format === 'json') {
            await saveTextAsJSON(extractedText, tempFilePath);
            res.setHeader('Content-Type', 'application/json');
        } else if (format === 'xml') {
            await saveTextAsXML(extractedText, tempFilePath);
            res.setHeader('Content-Type', 'application/xml');
        } else {
            return res.status(400).json({ success: false, message: 'Unsupported format requested.' });
        }
        res.download(tempFilePath, `${file.title}.${format}`, async (err) => {
            if (err) {
                console.error('Download error:', err);
                res.status(500).json({ success: false, message: 'Error downloading file.' });
            } else {
                await fs.unlink(tempFilePath);
            }
        });
    } catch (error) {
        console.error('DownloadFile Error:', error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
};

const saveFile = async (req, res) => {
    try {
        const fileId = req.params.fileId;
        const { saveForLater } = req.body;
        const userId = req.user._id;

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized: No user ID" });
        }

        const updatedFile = await File.findOneAndUpdate(
            { fileId: fileId, uploadedBy: userId }, 
            { saveForLater },
            { new: true }
        );

        if (!updatedFile) {
            return res.status(404).json({ message: "File not found or not authorized" });
        }

        res.status(200).json({ success: true, message: "Save-for-later status updated", file: updatedFile });
    } catch (error) {
        console.error("Save Error:", error);
        res.status(500).json({ success: false, message: "Server error while saving file for later" });
    }
};


const getSavedFiles = async (req, res) => {
    try {
        // If files are user-specific, you can use req.user.id (from authenticate middleware)
        const userId = req.user.id; // assuming authenticate adds this
        const files = await File.find({ uploadedBy: userId }); // or just {} if public for all

        res.status(200).json({ success: true, data: files });
    } catch (error) {
        console.error("Error fetching saved files:", error);
        res.status(500).json({ success: false, message: 'Failed to fetch saved files' });
    }
};

const downloadFileforsave = async (req, res) => {
    const { savefileId } = req.params;
    const { format } = req.query;

    const file = await File.findById(savefileId);
    if (!file) return res.status(404).json({ message: 'File not found' });

    if (format === 'json') {
        res.setHeader('Content-Disposition', `attachment; filename=${file.filename}.json`);
        res.setHeader('Content-Type', 'application/json');
        return res.send(JSON.stringify({ filename: file.filename, text: file.text }, null, 2));
    }

    if (format === 'xml') {
        const xml = create({ version: '1.0' })
            .ele('file')
            .ele('filename').txt(file.filename).up()
            .ele('text').txt(file.text).up()
            .end({ prettyPrint: true });

        res.setHeader('Content-Disposition', `attachment; filename=${file.filename}.xml`);
        res.setHeader('Content-Type', 'application/xml');
        return res.send(xml);
    }

    res.status(400).json({ message: 'Invalid format' });
};

const deletesave= async (req, res) => {
    const { fileId } = req.params;

    try {
        const deletedFile = await File.findOneAndDelete({ fileId });

        if (!deletedFile) {
            return res.status(404).json({ message: 'File not found' });
        }

        return res.status(200).json({ message: 'File deleted successfully' });
    } catch (error) {
        console.error('Error deleting file:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = { uploadFile, downloadFile, saveFile, getSavedFiles, downloadFileforsave,deletesave };
