const fs = require('fs').promises;
const pdfParse = require('pdf-parse');
const tesseract = require('tesseract.js');
const docxParser = require('docx-parser');
const { create } = require('xmlbuilder');

async function extractTextFromPDF(filePath) {
    const data = await fs.readFile(filePath);
    const parsed = await pdfParse(data);
    return parsed.text;
}

async function extractTextFromImage(filePath) {
    const { data } = await tesseract.recognize(filePath);
    return data.text;
}

async function extractTextFromWord(filePath) {
    return new Promise((resolve, reject) => {
        docxParser.parseDocx(filePath, (data, err) => {
            if (err) reject(err);
            resolve(data);
        });
    });
}

async function saveTextAsJSON(text, filePath) {
    await fs.writeFile(filePath, JSON.stringify({ text }, null, 2));
}

async function saveTextAsXML(text, filePath) {
    const xml = create('root').ele('text').dat(text).end({ pretty: true });
    await fs.writeFile(filePath, xml, 'utf-8');
}

module.exports = {
    extractTextFromPDF,
    extractTextFromImage,
    extractTextFromWord,
    saveTextAsJSON,
    saveTextAsXML,
};