const express = require('express');//good
const path = require('path');//good
//const { clog } = require('./middleware/clog');
const api = require('./routes/notes.js');

const PORT = process.env.port || 3001;

const app = express();

// Import custom middleware, "cLog"
//app.use(clog);

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//GET , POST and DELETE routs via router
app.use('/api/notes', api);
 
app.use(express.static('public'));

// GET Route for landing page 
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);