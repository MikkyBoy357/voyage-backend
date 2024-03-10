const express = require('express');
const router = express.Router();
const Tourist = require('../models/touristModel');
const {authorizeJwt, verifyAccount} = require("../helpers/verifyAccount");

router.get('/', authorizeJwt, verifyAccount([{name: 'tourists', action: "read"}]), async (req, res) => {

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
    const tourists = await Tourist.find(filter);
    res.status(200).json(tourists);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', authorizeJwt, verifyAccount([{name: 'tourist', action: "read"}]),async (req, res) => {
  try {
    const { id } = req.params;
    const tourist = await Tourist.findById(id);

    if (!tourist) {
      return res.status(404).json({ message: `Tourist with ID ${id} not found` });
    }

    res.status(200).json(tourist);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

router.post('/', authorizeJwt, verifyAccount([{name: 'tourist', action: "create"}]),async (req, res) => {
  try {
    const tourist = await Tourist.create(req.body);
    res.status(201).json(tourist);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id', authorizeJwt, verifyAccount([{name: 'tourist', action: "update"}]),async (req, res) => {
  try {
    const { id } = req.params;
    const tourist = await Tourist.findByIdAndUpdate(id, req.body, { new: true });
    if (!tourist) {
      return res.status(404).json({ message: `Cannot find any tourist with ID ${id}` });
    }
    res.status(200).json(tourist);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

router.delete('/:id', authorizeJwt, verifyAccount([{name: 'tourist', action: "delete"}]), async (req, res) => {
  try {
    const { id } = req.params;
    const tourist = await Tourist.findByIdAndDelete(id);
    if (!tourist) {
      return res.status(404).json({ message: `Cannot find any tourist with ID ${id}` });
    }
    res.status(200).json(tourist);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;