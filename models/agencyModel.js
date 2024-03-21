const mongoose = require('mongoose')

const agencySchema = new mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        userName: {
            type: String,
            required: [true, "Nom de l’agence"]
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

        // Data to be added after sign up
        type: {
            type: String,
            default: 'agency', // Set the default value to 'agency'
        },
        description: {
            type: String,
            default: 'No agency description yet',
        },
        logo: {
            type: String,
            default: 'No agency logo yet',
        },
        coverPhoto: {
            type: String,
            default: 'No agency coverPhoto yet',
        },
        presentationVideo: {
            type: String,
            default: 'No agency presentationVideo yet',
        },
    },
    {
        timestamps: true
    },
)

const Agency = mongoose.model('Agency', agencySchema);

module.exports = Agency;