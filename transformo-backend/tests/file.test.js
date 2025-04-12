const request = require('supertest');

let server;

// Patch original console to avoid async log issues
beforeAll(() => {
  console._logOriginal = console.log;
  jest.spyOn(console, 'log').mockImplementation((msg) => {
    if (
      msg.includes('MongoDB connected') ||
      msg.includes('Server running')
    ) return;
    console._logOriginal(msg);
  });

  server = require('../src/app'); // ✅ load and assign app.js
});

afterAll((done) => {
  server.close(done); // ✅ Close server to avoid Jest hang
});

describe('GET /api/files/savedfile', () => {
  it('should return 401 if not authenticated', async () => {
    const res = await request(server).get('/api/files/savedfile');
    expect(res.statusCode).toBe(401);
  });
});
