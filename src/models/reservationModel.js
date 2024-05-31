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


    // Getter e setter per il nome
    get firstName() {
        return this._firstName;
    }
    set firstName(value) {
        this._firstName = value;
    }

    // Getter e setter per il cognome
    get lastName() {
        return this._lastName;
    }
    set lastName(value) {
        this._lastName = value;
    }

    // Getter e setter per l'email
    get email() {
        return this._email;
    }
    set email(value) {
        this._email = value;
    }

    // Funzione di utilità per la lettura del file JSON delle prenotazioni
    static readReservationData() {
        try {
            const data = fs.readFileSync(reservationsFilePath, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }

    // Funzione di utilità per la scrittura nel file JSON delle prenotazioni
    static writeReservationData(data) {
        fs.writeFileSync(reservationsFilePath, JSON.stringify(data, null, 2));
    }

    // Recupera tutte le prenotazioni
    static getAllReservations() {
        return Reservation.readReservationData();
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
        Reservation.writeReservationData(reservations);
        return true;
    }

    // Elimina una prenotazione specifica dal file JSON
    static deleteReservation(eventId, reservationId) {
        let reservations = Reservation.getAllReservations();
        const initialLength = reservations.length;
        reservations = reservations.filter(reservation => reservation.eventId !== eventId || reservation.id !== reservationId);
        Reservation.writeReservationData(reservations);
        return initialLength !== reservations.length;
    }

    // Genera un nuovo ID per le prenotazioni
    static generateId() {
        const reservations = Reservation.getAllReservations();
        return reservations.length > 0 ? reservations[reservations.length - 1].id + 1 : 1;
    }

    // Metodo per recuperare tutte le prenotazioni associate a un evento
    static getEventReservations(eventId) {
        const reservations = Reservation.getAllReservations();
        return reservations.filter(reservation => reservation.eventId === eventId);
    }
}

module.exports = Reservation;
