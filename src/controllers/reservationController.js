const Reservation = require('../models/reservationModel');
const Event = require('../models/eventModel');

// Gestione della lettura di tutte le prenotazioni di un evento
exports.getAllByEvent = (req, res) => {
    const eventId = parseInt(req.params.event); // Recupera l'ID dell'evento dai parametri della richiesta
    const event = Event.getEventById(eventId); // Recupera l'evento dal modello Event
    if (event) {
        const reservations = Reservation.getReservationsByEventId(eventId); // Recupera le prenotazioni per l'evento
        res.status(200).json(reservations); // Risponde con le prenotazioni trovate
    } else {
        res.status(404).send('Evento non trovato.'); // Risponde con un errore se l'evento non è trovato
    }
};

// Gestione della creazione di una nuova prenotazione
exports.create = (req, res) => {
    const eventId = parseInt(req.params.event); // Recupera l'ID dell'evento dai parametri della richiesta
    const event = Event.getEventById(eventId); // Recupera l'evento dal modello Event
    if (event) {
        const { firstName, lastName, email } = req.body; // Recupera i dati della prenotazione dal corpo della richiesta
        const reservations = Reservation.getReservationsByEventId(eventId); // Recupera le prenotazioni per l'evento
        if (reservations.length >= event.maxSeats) {
            res.status(400).send('Non ci sono posti disponibili per questo evento.'); // Risponde con un errore se non ci sono posti disponibili
        } else {
            const newReservation = new Reservation(Reservation.generateId(), eventId, firstName, lastName, email); // Crea una nuova prenotazione
            Reservation.saveReservation(newReservation); // Salva la nuova prenotazione
            res.status(201).send('Prenotazione creata con successo.'); // Risponde con un messaggio di successo
        }
    } else {
        res.status(404).send('Evento non trovato.'); // Risponde con un errore se l'evento non è trovato
    }
};


// Gestione dell'eliminazione di una prenotazione
exports.delete = (req, res) => {
    const eventId = parseInt(req.params.event); // Recupera l'ID dell'evento dai parametri della richiesta
    const reservationId = parseInt(req.params.reservation); // Recupera l'ID della prenotazione dai parametri della richiesta
    const success = Reservation.deleteReservation(eventId, reservationId); // Elimina la prenotazione
    if (success) {
        res.status(200).send('Prenotazione eliminata con successo.'); // Risponde con un messaggio di successo
    } else {
        res.status(404).send('Prenotazione non trovata.'); // Risponde con un errore se la prenotazione non è trovata
    }
};
