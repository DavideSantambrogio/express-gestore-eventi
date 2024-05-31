const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

// Definizione delle rotte per gli eventi
router.get('/', eventController.getAll);    // [GET] /events
router.post('/', eventController.create);   // [POST] /events
router.put('/:event', eventController.update); // [PUT] /events/:event

module.exports = router;