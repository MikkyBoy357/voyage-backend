const mongoose = require('mongoose')

const touristSchema = new mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        firstName: {
            type: String,
            required: [true, "Prénom"]
        },
        lastName: {
            type: String,
            required: [true, "Nom"]
        },
        email: {
            type: String,
            required: [true, "Entrez l’address email"]
        },
        phone: {
            type: String,
            required: [true, "Numero de téléphone"]
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