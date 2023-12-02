const { readFile, writeFile } = require('fs').promises
const express = require("express");
const path = require('path');
const uuid = require('./uuid.js')

const app = express()

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));


app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/notes.html'));
});


app.get('/api/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './db/db.json'));
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});


// combine
// something to return the data req
// add the uuid to writefile

app.post('/api/notes', async (req, res) => {
  const data = await readFile('./db/db.json', 'utf8')
      const parsedData = JSON.parse(data);
      const content = {
        title: req.body.title,
        text: req.body.text,
        id: uuid()
      }
      parsedData.push(content);
      await writeFile('./db/db.json', JSON.stringify(parsedData));
      res.json('saved')
});



app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
