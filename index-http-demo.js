const http = require('http');
const hostname = '127.0.0.1';
const port = 8000;

const data = {
    message: 'Hello World!'
};

const users =[{
    id: 1,
    name: 'Ramesh',
}, {
    id: 2,
    name: 'Mahesh'
}];

const server = http.createServer((req, res) => {
    if(req.url === '/') {
        res.setHeader("Content-Type", "application/json");
        res.writeHead(200);
        res.end(JSON.stringify(data));
    } else if (req.url === '/users') {
        res.setHeader("Content-Type", "application/json");
        res.writeHead(200);
        res.end(JSON.stringify(users));
    } else if(req.url === '/download') {
        res.setHeader("Content-Type", "text/csv");
        res.setHeader("Content-Disposition", "attachment;filename=oceanpals.csv");
        res.writeHead(200);
        res.end(`id,name,email\n1,Sammy Shark,shark@ocean.com`);
    }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
