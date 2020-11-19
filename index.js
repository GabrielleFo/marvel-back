//import des packages
const express = require("express");
const axios = require("axios");
const md5 = require("md5");
const uid2 = require("uid2");
const cors = require("cors");

require("dotenv").config();
const app = express();
app.use(cors());

const publicKey = process.env.PUBLIC_KEY;
const privateKey = process.env.PRIVATE_KEY;

app.get("/", async (req, res) => {
  try {
    // Générer le ts
    const ts = uid2(8);
    const hash = md5(ts + privateKey + publicKey);

    const response = await axios.get(
      `http://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}`
    );
    res.json(response.data.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
app.listen(process.env.PORT, () => {
  console.log(`Server Started on port ${process.env.PORT}`);
});