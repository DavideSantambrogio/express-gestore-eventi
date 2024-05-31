const Event = require('../models/eventModel');

// Gestione della creazione di un nuovo evento
exports.create = (req, res) => {
    const { id, title, description, date, maxSeats } = req.body;
    const newEvent = new Event(id, title, description, date, maxSeats);
    const success = Event.saveEvent(newEvent);
    if (success) {
        res.status(201).send('Evento creato con successo.');
    } else {
        res.status(500).send('Si è verificato un errore durante la creazione dell\'evento.');
    }
};

// Gestione della lettura di tutti gli eventi con filtri opzionali
exports.getAll = (req, res) => {
    const filters = req.query; // Ottieni i filtri dalla query string
    const allEvents = Event.getEvents(filters);
    res.status(200).json(allEvents);
};

// Gestione dell'aggiornamento di un evento esistente
exports.update = (req, res) => {
    const eventId = parseInt(req.params.event);
    const { title, description, date, maxSeats } = req.body;
    const updatedEvent = new Event(eventId, title, description, date, maxSeats);
    const success = Event.updateEvent(eventId, updatedEvent);
    if (success) {
        res.status(200).send('Evento aggiornato con successo.');
    } else {
        res.status(404).send('Evento non trovato o errore durante l\'aggiornamento.');
    }
};

// Gestione dell'eliminazione di un evento esistente
exports.delete = (req, res) => {
    const eventId = req.params.event;
    const success = Event.deleteEvent(eventId);
    if (success) {
        res.status(200).send('Evento eliminato con successo.');
    } else {
        res.status(404).send('Evento non trovato o errore durante l\'eliminazione.');
    }
};

