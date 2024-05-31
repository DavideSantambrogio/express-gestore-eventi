const Reservation = require('../models/reservationModel');
const Event = require('../models/eventModel');

// Funzione di utilità per recuperare un evento dal suo ID
const getEventById = (eventId) => {
    return Event.getEventById(eventId);
};

// Funzione di utilità per recuperare tutte le prenotazioni di un evento
const getReservationsByEventId = (eventId) => {
    return Reservation.getReservationsByEventId(eventId);
};

// Gestione della lettura di tutte le prenotazioni di un evento
exports.getAllByEvent = (req, res) => {
    const eventId = parseInt(req.params.event);
    const event = getEventById(eventId);
    if (event) {
        const reservations = getReservationsByEventId(eventId);
        res.status(200).json(reservations);
    } else {
        res.status(404).send('Evento non trovato.');
    }
};

// Funzione di utilità per creare una nuova prenotazione
const createReservation = (eventId, firstName, lastName, email) => {
    const reservations = getReservationsByEventId(eventId);
    if (reservations.length >= event.maxSeats) {
        throw new Error('Non ci sono posti disponibili per questo evento.');
    }
    const newReservation = new Reservation(Reservation.generateId(), eventId, firstName, lastName, email);
    Reservation.saveReservation(newReservation);
};

// Gestione della creazione di una nuova prenotazione
exports.create = (req, res) => {
    const eventId = parseInt(req.params.event);
    const event = getEventById(eventId);
    if (event) {
        const { firstName, lastName, email } = req.body;
        try {
            createReservation(eventId, firstName, lastName, email);
            res.status(201).send('Prenotazione creata con successo.');
        } catch (error) {
            res.status(400).send(error.message);
        }
    } else {
        res.status(404).send('Evento non trovato.');
    }
};

// Funzione di utilità per eliminare una prenotazione
const deleteReservation = (eventId, reservationId) => {
    return Reservation.deleteReservation(eventId, reservationId);
};

// Gestione dell'eliminazione di una prenotazione
exports.delete = (req, res) => {
    const eventId = parseInt(req.params.event);
    const reservationId = parseInt(req.params.reservation);
    const success = deleteReservation(eventId, reservationId);
    if (success) {
        res.status(200).send('Prenotazione eliminata con successo.');
    } else {
        res.status(404).send('Prenotazione non trovata.');
    }
};
