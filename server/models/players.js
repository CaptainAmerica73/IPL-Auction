import mongoose from "mongoose";

const playerSchema = new mongoose.Schema({
  image: { type: String, required: true },
  name: { type: String, required: true },
  nationality: { type: String, required: true },
  specialization: { type: String, required: true },
  dob: { type: Date },
  squad: String,
  debut: String,
  stats: {
    "Batting & Fielding": [
      {
        type: Map,
        of: String,
      },
    ],
    Bowling: [
      {
        type: Map,
        of: String,
      },
    ],
  },
});

export const Player = mongoose.model("Player", playerSchema);
