const fs = require('fs');

class Event {
    constructor(id, title, description, date, maxSeats) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.date = date;
        this.maxSeats = maxSeats;
    }

    // Metodo statico per generare un nuovo ID univoco per l'evento
    static generateUniqueId() {
        try {
            const eventsData = fs.readFileSync('./data/eventData.json', 'utf-8');
            const events = JSON.parse(eventsData);
            const maxId = events.reduce((max, event) => (event.id > max ? event.id : max), 0);
            return maxId + 1;
        } catch (error) {
            return 1;
        }
    }

    // Metodo statico per leggere tutti gli eventi dal file JSON
    static getAllEvents() {
        try {
            const eventsData = fs.readFileSync('./data/eventData.json', 'utf-8');
            return JSON.parse(eventsData);
        } catch (error) {
            return [];
        }
    }

    // Metodo statico per salvare un nuovo evento nel file JSON
    static saveEvent(event) {
        try {
            // Legge gli eventi esistenti dal file JSON
            const events = Event.getAllEvents();

            // Genera un nuovo ID univoco per l'evento
            const newId = Event.generateUniqueId();
            event.id = newId;

            // Aggiunge il nuovo evento alla lista
            events.push(event);

            // Scrive gli eventi aggiornati nel file JSON
            fs.writeFileSync('./data/eventData.json', JSON.stringify(events, null, 2));
            
            return true;
        } catch (error) {
            return false;
        }
    }

    // Metodo statico per aggiornare un evento esistente nel file JSON
    static updateEvent(eventId, updatedEventData) {
        try {
            // Legge gli eventi esistenti dal file JSON
            const events = Event.getAllEvents();

            // Cerca l'evento da aggiornare
            const eventToUpdate = events.find(event => event.id === eventId);
            if (!eventToUpdate) {
                return false; // Se l'evento non esiste, restituisci false
            }

            // Aggiorna i dati dell'evento
            Object.assign(eventToUpdate, updatedEventData);

            // Scrive gli eventi aggiornati nel file JSON
            fs.writeFileSync('./data/eventData.json', JSON.stringify(events, null, 2));
            
            return true;
        } catch (error) {
            return false;
        }
    }
}

module.exports = Event;
