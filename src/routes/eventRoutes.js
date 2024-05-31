const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

// Definizione delle rotte per gli eventi
router.get('/', eventController.index);    // [GET] /events
router.post('/', eventController.store);   // [POST] /events
router.put('/:event', eventController.update); // [PUT] /events/:event

module.exports = router;
