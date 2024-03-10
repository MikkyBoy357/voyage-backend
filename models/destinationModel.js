const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        title: { type: String, required: true },
        description: { type: String, required: true },
        location: { type: String, required: true },
    },
    {
        timestamps: true
    },
);

const Destination = mongoose.model('Destination', destinationSchema);

module.exports = Destination;