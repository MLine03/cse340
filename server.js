const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const inventoryRoutes = require('./src/routes/inventoryRoutes');
const classificationRoutes = require('./src/routes/classificationRoutes');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'src/public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({ secret: 'mysecret', resave: false, saveUninitialized: true }));
app.use(flash());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

app.use('/inventory', inventoryRoutes);
app.use('/classification', classificationRoutes);

app.get('/', (req, res) => res.redirect('/inventory'));

app.use((err, req, res, next) => {
  res.status(500).render('errors/error', { error: err.message });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));