const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        title: { type: String, required: true },
        description: { type: String, required: true },
        location: { type: String, default: "https://s3-alpha-sig.figma.com/img/f497/3dc1/6588a82aebd25636266225e437d08c38?Expires=1711324800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=XoVlvz6EKQbVZUWU8VODjgPqEg7nV~ppwyNjj1ZUZOsC6nR85N-LwbWqnHEgKQGmrRu~j0v7fd1TgW2IDB-4sBU53LOFqC~oVQbML5MYx~qalnbOqWrTGYlBlY9NpOdnoccykE4QDOUF2019U-CHrN2EYpLcMZ3~NEpiVndUdT2oVZkuiHjbD0U7G4a6L9oZ0S95qzYxUAXMHKUVkNAvdfnhcHsyTY9UNJWOubCT8EagLXLK6SePiS1p9dHYAiE2eBQJ-dZ2LlaGSZf3vBo3o-vSO-qi9JoYqP1PmH~fT7a~auIicxeOpJIntuaslHLhwxSoXGwl6x3aPRjmrYTPuA__" },
        agencies: [
            {
                name: { type: String, required: true },
                address: { type: String },
                description : {type: String},
            }
        ],   
     },
    {
        timestamps: true
    },
);

const Destination = mongoose.model('Destination', destinationSchema);

module.exports = Destination;