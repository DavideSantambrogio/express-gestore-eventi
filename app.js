const express = require('express');
const dotenv = require('dotenv');

// Configurazione variabili ambiente
dotenv.config();

const app = express();

// Middleware per parsare il JSON
app.use(express.json());

// Rotte di base
app.get('/', (req, res) => {
    res.send('<h1>Benvenuto nel mio blog!</h1>');
});

// Gestione della favicon
app.get('/favicon.ico', (req, res) => {
    res.status(404).send('Favicon not found');
});

// Importa e usa le route per gli eventi
const eventRoutes = require('./src/routes/eventRoutes');
app.use('/events', eventRoutes);  // Questa riga collega le rotte degli eventi

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
