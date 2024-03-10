const mongoose = require('mongoose')

const touristSchema = new mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        firstName: {
            type: String,
            required: [true, "Please enter tourist first name"]
        },
        lastName: {
            type: String,
            required: [true, "Please enter tourist last name"]
        },
        email: {
            type: String,
            required: [true, "Please enter tourist email"]
        },
        phone: {
            type: String,
            required: [true, "Please enter tourist phone number"]
        },
        address: {
            type: String,
        },
        password: { type: String, required: true },
        status: {
            type: String,
            required: true
        },
        type: {
            type: String,
            default: 'tourist', // Set the default value to 'tourist'
        },
    },
    {
        timestamps: true
    },
)

const Tourist = mongoose.model('Tourist', touristSchema);

module.exports = Tourist;