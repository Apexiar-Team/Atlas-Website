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

function sendFile(filePath, request, response, statusCode = 200) {
  // Browser video seeking needs byte ranges; stream media instead of buffering it.
  if (path.extname(filePath).toLowerCase() === '.mp4' && statusCode === 200) {
    fs.stat(filePath, (error, stats) => {
      if (error) { response.writeHead(500); response.end(); return; }
      const headers = { 'Content-Type': 'video/mp4', 'Accept-Ranges': 'bytes' };
      let start = 0, end = stats.size - 1, status = 200;
      if (request.headers.range) {
        const match = /^bytes=(\d*)-(\d*)$/.exec(request.headers.range);
        if (match && (match[1] || match[2])) {
          if (!match[1]) start = Math.max(0, stats.size - Number(match[2]));
          else { start = Number(match[1]); if (match[2]) end = Math.min(end, Number(match[2])); }
        }
        if (!match || !(match[1] || match[2]) || !Number.isSafeInteger(start) || !Number.isSafeInteger(end) || start > end || start >= stats.size) {
          response.writeHead(416, { ...headers, 'Content-Range': `bytes */${stats.size}` }); response.end(); return;
        }
        status = 206;
        headers['Content-Range'] = `bytes ${start}-${end}/${stats.size}`;
      }
      headers['Content-Length'] = end - start + 1;
      response.writeHead(status, headers);
      if (request.method === 'HEAD') { response.end(); return; }
      const stream = fs.createReadStream(filePath, { start, end });
      stream.on('error', () => response.destroy());
      response.on('close', () => stream.destroy());
      stream.pipe(response);
    });
    return;
  }
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
        sendFile(filePath, request, response);
        return;
      }

      const notFoundPath = path.join(ROOT, '404.html');
      fs.stat(notFoundPath, (notFoundError, notFoundStats) => {
        if (!notFoundError && notFoundStats.isFile()) {
          sendFile(notFoundPath, request, response, 404);
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
