const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = __dirname;
const types = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.png':'image/png'};
http.createServer((req,res) => {
  let pathname;
  try { pathname = decodeURIComponent(new URL(req.url,'http://localhost').pathname); } catch { res.writeHead(400).end(); return; }
  const target = path.resolve(root,'.' + pathname + (pathname.endsWith('/')?'index.html':''));
  if (!target.startsWith(root + path.sep) || !types[path.extname(target)]) {res.writeHead(404).end();return;}
  fs.readFile(target,(error,data) => {if(error){res.writeHead(404).end();return;}res.writeHead(200,{'Content-Type':types[path.extname(target)]});res.end(data);});
}).listen(8080,'127.0.0.1',() => console.log('Home page studies: http://127.0.0.1:8080'));
