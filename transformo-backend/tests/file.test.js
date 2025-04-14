const request = require('supertest');
const express = require('express');
const fileRoutes = require('../src/routes/fileRoutes');

jest.mock('../src/middleware/auth', () => ({
  authenticate: (req, res, next) => {
    req.user = { id: 'test-user-id' }; // Mock authenticated user
    next();
  }
}));

const app = express();
app.use(express.json());
app.use('/api/files', fileRoutes);

// Mock fileController functions
jest.mock('../src/controllers/fileController', () => ({
  uploadFile: (req, res) => res.status(201).json({ message: 'File uploaded' }),
  downloadFile: (req, res) => res.status(200).json({ message: 'File downloaded' }),
  saveFile: (req, res) => res.status(200).json({ message: 'File saved' }),
  getSavedFiles: (req, res) => res.status(200).json({ files: ['file1', 'file2'] }),
  downloadFileforsave: (req, res) => res.status(200).json({ message: 'Saved file downloaded' }),
  deletesave: (req, res) => res.status(200).json({ message: 'Saved file deleted' })
}));

describe('File Routes', () => {

  it('POST /api/files/upload should upload a file', async () => {
    const res = await request(app)
      .post('/api/files/upload')
      .attach('file', Buffer.from('dummy content'), 'dummy.txt');

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe('File uploaded');
  });

  it('GET /api/files/download/:fileId should download a file', async () => {
    const res = await request(app).get('/api/files/download/test-id');
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('File downloaded');
  });

  it('PUT /api/files/save/:fileId should save a file', async () => {
    const res = await request(app).put('/api/files/save/test-id');
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('File saved');
  });

  it('GET /api/files/savedfile should return saved files', async () => {
    const res = await request(app).get('/api/files/savedfile');
    expect(res.statusCode).toBe(200);
    expect(res.body.files).toEqual(expect.arrayContaining(['file1', 'file2']));
  });

  it('GET /api/files/downloadsaved/:savefileId should download saved file', async () => {
    const res = await request(app).get('/api/files/downloadsaved/saved-id');
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Saved file downloaded');
  });

  it('DELETE /api/files/savedfile/:fileId should delete saved file', async () => {
    const res = await request(app).delete('/api/files/savedfile/test-id');
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Saved file deleted');
  });

});
