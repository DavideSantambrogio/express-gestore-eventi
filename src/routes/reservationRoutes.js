const express = require('express');
const reservationController = require('../controllers/reservationController');

const router = express.Router({ mergeParams: true });

// Rotta per ottenere tutte le prenotazioni di un evento
router.get('/:event/reservations', reservationController.getAllByEvent);

// Rotta per creare una nuova prenotazione
router.post('/:event/reservations', reservationController.create);

// Rotta per eliminare una prenotazione specifica
router.delete('/:event/reservations/:reservation', reservationController.delete);

module.exports = router;
