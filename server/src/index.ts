import { config } from "dotenv";
config();

import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import Deck from "./models/Deck";

const PORT = 5000;

const app = express();

app.use(cors(
  {
    origin: "*"
  }
));
app.use(express.json());

app.get("/decks", async (req: Request, res: Response) => {
  const decks = await Deck.find()
  res.json(decks)
})

app.post("/decks", async (req: Request, res: Response) => {
  const newDeck = new Deck({
    title: req.body.title,
  });
  const createDeck = await newDeck.save();
  res.json(createDeck);
});

mongoose
  .connect(
    "mongodb+srv://flashcardsage:VIpihSidvj8SOlkm@cluster0.58xbveu.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log(`listening on port ${PORT}`);
    app.listen(PORT);
  });
