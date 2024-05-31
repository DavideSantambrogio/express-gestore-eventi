exports.index = (req, res) => {
    // Funzione per ottenere la lista degli eventi
    res.send('Lista degli eventi');
};

exports.store = (req, res) => {
    // Funzione per creare un nuovo evento
    res.send('Evento creato');
};

exports.update = (req, res) => {
    // Funzione per aggiornare un evento esistente
    res.send('Evento aggiornato');
};
