const mongoose = require('mongoose');
const { validPermissionNames } = require("../helpers/constants");

const validActions = ['read', 'update', 'delete', 'create'];

const permissionSchema = new mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        name: {
            type: String,
            required: true,
            validate: {
                validator: function (value) {
                    return validPermissionNames.includes(value);
                },
                message: 'Nom incorrect'//Name is not correct
            }
        },
        description: {
            type: String,
        },
        action: {
            type: String,
            validate: {
                validator: function (action) {
                    return validActions.includes(action);
                },
                message: 'Une action au moins est requise : lecture, misajour, suppression, creation',//At least one valid action is required: read, update, delete, create
            },
        },
    },
    {
        timestamps: true
    },
);

const Permission = mongoose.model('Permission', permissionSchema);

module.exports = Permission;