const express = require('express');
const server = express();
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./gik339-labb2.db');
        
server
 .use(express.json())
 .use(express.urlencoded({ extended: false }))
 .use((req, res, next) => {
 res.header('Access-Control-Allow-Origin', '*')
 res.header('Access-Control-Allow-Headers', '*');
 res.header('Access-Control-Allow-Methods', '*');
 next();
 });

 server.get('/', (req, res) => {
    const method = req.method;
    const url = req.url;
    res.send(`Du gjorde en ${method}-förfrågan till url:en ${url}`);
});

server.get('/users', (req, res) => {
  const sql = 'SELECT * FROM USERS';
  db.all(sql, [], (err, rows) => {
      if (err) {
        
        res.status(500).send('Databasfel: ' + err.message);
      } else {
       
        res.json(rows);
      }
    });
  });

server.listen(3000, () => {
    console.log('Server running on http://localhost:3000.');

});