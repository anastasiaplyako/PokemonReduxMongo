const http = require('http');
const express = require("express");
const config = require("./config/default.json")
const mongoose = require("mongoose")

const PORT = config.port || 5000;
const app = express();

app.use(express.json({extended: true}));
app.use('/api/auth', require("./routes/auth"));
app.use('/api/img', require("./routes/pokemons.route"));

async function start() {
    try {
        console.log(config.mongoUri);
        await mongoose.connect(config.mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        app.listen(PORT, () => {
            console.log("Server is start on ", PORT)
        })
    } catch (e) {
        console.log("Message error", e);
        process.exit(1);
    }
}


start().then();
