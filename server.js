const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = Number(process.env.PORT) || 4173;
const ROOT = __dirname;

const MIME_TYPES = {
  '.css': 'text/css; charset=utf-8',
  '.gif': 'image/gif',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.mp4': 'video/mp4',
  '.pdf': 'application/pdf',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.webp': 'image/webp',
  '.xml': 'application/xml; charset=utf-8'
};

function sendFile(filePath, response, statusCode = 200) {
  fs.readFile(filePath, (error, content) => {
    if (error) {
      response.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      response.end('Internal Server Error');
      return;
    }

    const extension = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[extension] || 'application/octet-stream';

    response.writeHead(statusCode, { 'Content-Type': contentType });
    response.end(content);
  });
}

function resolveRequestPath(requestUrl) {
  const requestPath = decodeURIComponent(new URL(requestUrl, 'http://localhost').pathname);
  const normalizedPath = path.normalize(requestPath).replace(/^([.][.][/\\])+/, '');
  let filePath = path.join(ROOT, normalizedPath);

  if (requestPath === '/') {
    filePath = path.join(ROOT, 'index.html');
  }

  return filePath;
}

const server = http.createServer((request, response) => {
  if (!request.url) {
    response.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Bad Request');
    return;
  }

  let filePath = resolveRequestPath(request.url);

  fs.stat(filePath, (error, stats) => {
    if (!error && stats.isDirectory()) {
      filePath = path.join(filePath, 'index.html');
    }

    fs.stat(filePath, (fileError, fileStats) => {
      if (!fileError && fileStats.isFile()) {
        sendFile(filePath, response);
        return;
      }

      const notFoundPath = path.join(ROOT, '404.html');
      fs.stat(notFoundPath, (notFoundError, notFoundStats) => {
        if (!notFoundError && notFoundStats.isFile()) {
          sendFile(notFoundPath, response, 404);
          return;
        }

        response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        response.end('Not Found');
      });
    });
  });
});

server.listen(PORT, () => {
  console.log(`Apexiar site available at http://localhost:${PORT}`);
});