const express = require('express');
const router = express.Router();
const Destination = require('../models/destinationModel');

const mongoose = require("mongoose");
const {authorizeJwt, verifyAccount} = require("../helpers/verifyAccount");

// GET /destinations - Get all destinations
router.get('/', authorizeJwt, verifyAccount([{name: 'destination', action: "read"}]), async (req, res) => {

    const filter = {};
    const search = req.query.search;

    if (search) {
        filter.$or = [
            { description: { $regex: search, $options: "i" } },
            { title: { $regex: search, $options: "i" } },
        ];
    }

    try {
        const destinations = await Destination.find(filter);
        res.status(200).json(destinations);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: error.message });
    }
});

// GET /destinations/:id - Get a specific destination by ID
router.get('/:id', authorizeJwt, verifyAccount([{name: 'destination', action: "read"}]), async (req, res) => {
    try {
        const { id } = req.params;
        const destination = await Destination.findById(id);

        if (!destination) {
            return res.status(404).json({ message: `Package type with ID ${id} not found` });
        }

        res.status(200).json(destination);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: error.message });
    }
});

// POST /destinations - Create a new destination
router.post('/', authorizeJwt, verifyAccount([{name: 'destination', action: "create"}]), async (req, res) => {
    try {
        // Generate a new ObjectId for the _id field
        const newId = new mongoose.Types.ObjectId();

        // Assign the generated _id to req.body
        req.body._id = newId;

        const destination = await Destination.create(req.body);
        res.status(201).json(destination);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: error.message });
    }
});

// PUT /destinations/:id - Update a destination by ID
router.put('/:id', authorizeJwt, verifyAccount([{name: 'destination', action: "update"}]), async (req, res) => {
    try {
        const { id } = req.params;
        const destination = await Destination.findByIdAndUpdate(id, req.body, { new: true });

        if (!destination) {
            return res.status(404).json({ message: `Cannot find any destination with ID ${id}` });
        }

        res.status(200).json(destination);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: error.message });
    }
});

// DELETE /destinations/:id - Delete a destination by ID
router.delete('/:id', authorizeJwt, verifyAccount([{name: 'destination', action: "delete"}]), async (req, res) => {
    try {
        const { id } = req.params;
        const destination = await Destination.findByIdAndDelete(id);

        if (!destination) {
            return res.status(404).json({ message: `Cannot find any destination with ID ${id}` });
        }

        res.status(200).json(destination);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
