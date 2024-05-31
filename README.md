# Esercizio
Il nostro obiettivo sarà quello di creare le api per un applicazione che gestirà degli eventi con le relative prenotazioni. Proseguiamo per milestone in modo da avere tutto sotto controllo.
 
#  Milestone 1
**Creiamo le seguenti rotte con relativo controller e router senza implementare le funzioni del controller.**
- [x] [GET] events/ (index)
- [x] [POST] events/ (store)
- [x] [PUT] events/:event (update)

# Milestone 2
**Creiamo il model models/event.js e prevediamo le seguenti proprietà:**
- [x] id
- [x] title
- [x] description
- [x] date
- [x] maxSeats (numero massimo di posti)
- [x] Tramite dei metodi statici, facciamo in modo di poter leggere e salvare i dati su un file json dedicato.
- [x] Un’istanza della classe rappresenterà un singolo evento.

# Milestone 3
- [x] Usiamo il model nelle funzioni scritte nei controller e facciamo in modo che tramite dei metodi statici del model possiamo recuperare uno (tramite id) o tutti gli eventi.
- [x] Prevediamo la possibilità di passare dei filtri tramite query string alla rotta index.

# Milestone 4
- [x] Gestiamo eventuali errori 404 e 500 tramite dei middleware dedicati.

# Bonus
### Bonus 1
**Creiamo le seguenti rotte per gestire le prenotazioni**
- [] [GET] events/:event/reservations (index)
- [] [POST] events/:event/reservations (store)
- [] [DELETE] events/:event/reservations/:reservation (destroy)

### Bonus 2
**Creiamo il model models/reservation.js e prevediamo le seguenti proprietà**
- [] id
- [] firstName
- [] lastName
- [] email
- [] eventId
- []  Nel model degli eventi, prevediamo una funzione per recuperare tutte le prenotazioni associate

### Bonus 3
- []  Creiamo dei setter per ogni proprietà dei nostri model ed implementiamo una validazione dei dati ricevuti. Nel caso, lanciamo un errore

### Bonus 4
- []  Creare degli errori personalizzati estendendo la classe Error.

### Bonus 5
- []  Non permettiamo di aggiungere o togliere una prenotazione per un evento già passato

### Bonus 6
- []  Non permettiamo di aggiungere una prenotazione ad evento senza più posti disponibili.
