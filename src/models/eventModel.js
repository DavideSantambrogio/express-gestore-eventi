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

    static getEventById(eventId) {
        try {
            const events = Event.getAllEvents();
            return events.find(event => event.id === eventId);
        } catch (error) {
            return null;
        }
    }

    // Metodo statico per recuperare tutti gli eventi con filtri opzionali
    static getEvents(filters = {}) {
        try {
            const events = Event.getAllEvents();

            // Converti i valori dei filtri in stringhe altrimenti postman non funziona correttamente 
            const stringifiedFilters = {};
            for (const key in filters) {
                stringifiedFilters[key] = filters[key].toString();
            }

            // Applica i filtri, se presenti
            if (Object.keys(stringifiedFilters).length > 0) {
                return events.filter(event => {
                    for (const key in stringifiedFilters) {
                        if (event[key].toString() !== stringifiedFilters[key]) {
                            return false;
                        }
                    }
                    return true;
                });
            }

            return events;
        } catch (error) {
            return [];
        }
    }

}

module.exports = Event;
