const express = require('express');
const bodyParser = require('body-parser');
const Tramite = require('./tramite');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

// CRUD: Create
app.post('/tramite', (req, res) => {
  Tramite.create(req.body, (error, results) => {
    if (error) return res.status(500).json({ error });
    res.json({ id: results.insertId });
  });
});

// CRUD: Read (all)
app.get('/tramites', (req, res) => {
  Tramite.fetchAll((error, results) => {
    if (error) return res.status(500).json({ error });
    res.json(results);
  });
});

// CRUD: Read (one by id)
app.get('/tramite/:id', (req, res) => {
  Tramite.findById(req.params.id, (error, results) => {
    if (error) return res.status(500).json({ error });
    if (results.length === 0) return res.status(404).json({ message: 'Not found' });
    res.json(results[0]);
  });
});

// CRUD: Update
app.put('/tramite/:id', (req, res) => {
  Tramite.update(req.params.id, req.body, (error) => {
    if (error) return res.status(500).json({ error });
    res.json({ message: 'Updated successfully' });
  });
});

// CRUD: Delete
app.delete('/tramite/:id', (req, res) => {
  Tramite.delete(req.params.id, (error) => {
    if (error) return res.status(500).json({ error });
    res.json({ message: 'Deleted successfully' });
  });
});


app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});


module.exports = Tramite;