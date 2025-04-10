const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    fileId: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    fileName: { type: String, required: true },
    filePath: { type: String, required: true },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    savedForLater: { type: Boolean, default: false }
});

module.exports = mongoose.model('File', fileSchema);
