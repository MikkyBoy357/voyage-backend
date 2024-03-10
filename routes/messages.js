const express = require('express');
const router = express.Router();
const Message = require('../models/messageModel');
const { authorizeJwt, verifyAccount } = require('../helpers/verifyAccount');

// Get all messages
router.get('/', authorizeJwt, verifyAccount([{ name: 'agency', action: 'read' }]), async (req, res) => {
  try {
    const messages = await Message.find();
    res.status(200).json(messages);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
});

// Get messages for a specific user (Tourist or Agency)
router.get('/user/:id', authorizeJwt, verifyAccount([{ name: 'agency', action: 'read' }]), async (req, res) => {
  try {
    const userId = req.params.id;
    const messages = await Message.find({ $or: [{ sender: userId }, { receiver: userId }] });
    res.status(200).json(messages);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
});

// Create a new message
router.post('/', authorizeJwt, verifyAccount([{ name: 'agency', action: 'create' }]), async (req, res) => {
  try {
    const newMessage = await Message.create(req.body);
    res.status(201).json(newMessage);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
});

// Update a message
router.put('/:id', authorizeJwt, verifyAccount([{ name: 'agency', action: 'update' }]), async (req, res) => {
  try {
    const messageId = req.params.id;
    const updatedMessage = await Message.findByIdAndUpdate(messageId, req.body, { new: true });
    if (!updatedMessage) {
      return res.status(404).json({ message: `Cannot find any message with ID ${messageId}` });
    }
    res.status(200).json(updatedMessage);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
});

// Delete a message
router.delete('/:id', authorizeJwt, verifyAccount([{ name: 'agency', action: 'delete' }]), async (req, res) => {
  try {
    const messageId = req.params.id;
    const deletedMessage = await Message.findByIdAndDelete(messageId);
    if (!deletedMessage) {
      return res.status(404).json({ message: `Cannot find any message with ID ${messageId}` });
    }
    res.status(200).json(deletedMessage);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
