const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = require('./app');

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: false }));

// Allow requests from http://localhost:3001 (your frontend origin)
server.use(cors({
    origin: '*'
}));

server.use(app);

const mongoUri = `mongodb+srv://king:king@cluster0.k7g119p.mongodb.net/?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose.connect(mongoUri).then(() => {
    console.log("===========> connected to MongoDB <===========");
    const port = process.env.PORT || 3000;
    server.listen(port, () => {
        console.log(`Node API app is running on port ${port}`);
    });
}).catch((error) => {
    console.log(error);
});

module.exports = server;
