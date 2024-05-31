const express = require('express');
const dotenv = require('dotenv');
const notFoundMiddleware = require('./src/middlewares/notFound');
const internalServerErrorMiddleware = require('./src/middlewares/internalServerError');

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
const reservationRoutes = require('./src/routes/reservationRoutes');
app.use('/events', eventRoutes);  // Rotte per gli eventi
app.use('/events', reservationRoutes);  // Rotte per le prenotazioni

// Middleware per gestire l'errore 404 (Not Found)
app.use(notFoundMiddleware);

// Middleware per gestire l'errore 500 (Internal Server Error)
app.use(internalServerErrorMiddleware);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
