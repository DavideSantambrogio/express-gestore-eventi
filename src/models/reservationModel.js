const fs = require('fs');

const reservationsFilePath = './data/reservationData.json'; // Percorso del file delle prenotazioni

class Reservation {
    constructor(id, eventId, firstName, lastName, email) {
        this.id = id;
        this.eventId = eventId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }

    // Recupera tutte le prenotazioni dal file JSON
    static getAllReservations() {
        try {
            const data = fs.readFileSync(reservationsFilePath, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }

    // Recupera le prenotazioni per un evento specifico
    static getReservationsByEventId(eventId) {
        const reservations = Reservation.getAllReservations();
        return reservations.filter(reservation => reservation.eventId === eventId);
    }

    // Salva una nuova prenotazione nel file JSON
    static saveReservation(newReservation) {
        const reservations = Reservation.getAllReservations();
        reservations.push(newReservation);
        fs.writeFileSync(reservationsFilePath, JSON.stringify(reservations, null, 2));
        return true;
    }

    // Elimina una prenotazione specifica dal file JSON
    static deleteReservation(eventId, reservationId) {
        let reservations = Reservation.getAllReservations();
        const initialLength = reservations.length;
        reservations = reservations.filter(reservation => reservation.eventId !== eventId || reservation.id !== reservationId);
        fs.writeFileSync(reservationsFilePath, JSON.stringify(reservations, null, 2));
        return initialLength !== reservations.length;
    }

    // Genera un nuovo ID per le prenotazioni
    static generateId() {
        const reservations = this.getAllReservations();
        return reservations.length > 0 ? reservations[reservations.length - 1].id + 1 : 1;
    }

    // Metodo per recuperare tutte le prenotazioni associate a un evento
    static getEventReservations(eventId) {
        try {
            const reservationsData = fs.readFileSync(reservationsFilePath, 'utf8');
            const allReservations = JSON.parse(reservationsData);
            return allReservations.filter(reservation => reservation.eventId === eventId);
        } catch (error) {
            console.error('Errore durante il recupero delle prenotazioni associate all\'evento:', error);
            return [];
        }
    }
}

module.exports = Reservation;
