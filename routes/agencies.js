const express = require('express');
const router = express.Router();
const Agency = require('../models/agencyModel');
const {authorizeJwt, verifyAccount} = require("../helpers/verifyAccount");

router.get('/', authorizeJwt, verifyAccount([{name: 'agency', action: "read"}]), async (req, res) => {

    const filter = {};
    const search = req.query.search;

    if (search) {
        filter.$or = [
            { firstName: { $regex: search, $options: "i" } },
            { lastName: { $regex: search, $options: "i" } },
            { phone: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } },
            { address: { $regex: search, $options: "i" } },
        ];
    }

    try {
        const agencies = await Agency.find(filter);
        res.status(200).json(agencies);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});

router.get('/:id', authorizeJwt, verifyAccount([{name: 'agency', action: "read"}]), async (req, res) => {
    try {
        const { id } = req.params;
        const agency = await Agency.findById(id);

        if (!agency) {
            return res.status(404).json({ message: `Agency with ID ${id} not found` });
        }

        res.status(200).json(agency);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});

router.post('/', authorizeJwt, verifyAccount([{name: 'agency', action: "create"}]), async (req, res) => {
    try {
        const agency = await Agency.create(req.body);
        res.status(201).json(agency);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});

router.put('/:id', authorizeJwt, verifyAccount([{name: 'agency', action: "update"}]), async (req, res) => {
    try {
        const { id } = req.params;
        const agency = await Agency.findByIdAndUpdate(id, req.body, { new: true });
        if (!agency) {
            return res.status(404).json({ message: `Cannot find any agency with ID ${id}` });
        }
        res.status(200).json(agency);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});

router.delete('/:id', authorizeJwt, verifyAccount([{name: 'agency', action: "delete"}]), async (req, res) => {
    try {
        const { id } = req.params;
        const agency = await Agency.findByIdAndDelete(id);
        if (!agency) {
            return res.status(404).json({ message: `Cannot find any agency with ID ${id}` });
        }
        res.status(200).json(agency);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;