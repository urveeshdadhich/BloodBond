require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const { connectToDatabase } = require('./src/config/database');
const donorRoutes = require('./src/routes/donorRoutes');
const contactRoutes = require('./src/routes/contactRoutes');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/donors', donorRoutes);
app.use('/api/contact', contactRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'BloodBond API is running on PostgreSQL' });
});

async function startServer() {
  await connectToDatabase();
  app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
}

startServer();