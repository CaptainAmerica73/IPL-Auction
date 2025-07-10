import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { User } from "./users.js";

const auctionSchema = new mongoose.Schema(
  {
    auctionName: {
      type: String,
      required: true,
      unique: true,
    },
    totalTeams: {
      type: Number,
      required: true,
      min: 3,
      max: 10,
    },
    currentTeams: {
      type: Number,
      default: 0,
      min: 0,
      validate: {
        validator: function (v) {
          return v <= this.totalTeams;
        },
        message: "Auction is full, cannot add more teams",
      },
    },
    teams: [
      {
        owner: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        teamName: {
          type: String,
          required: true,
        },
        wallet: {
          type: String,
          required: true,
        },
        imageURL: {
          type: String,
          default: null,
        },
        active: {
          type: Boolean,
          default: false,
        },
        players: [
          {
            player: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Player",
            },
            price: {
              type: Number,
              required: true,
            },
          },
        ],
      },
    ],
    players: [
      {
        playerId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Player",
          required: true,
        },
        soldTo: { type: String, default: null },
        price: { type: Number, default: null },
      },
    ],
    wallet: {
      type: String,
      required: true,
    },
    privacy: {
      type: String,
      enum: ["public", "private"],
      default: "private",
    },
    status: {
      type: String,
      enum: ["idle", "active", "ended"],
      default: "idle",
    },
    password: {
      type: String,
      validate: {
        validator: function (value) {
          if (this.privacy === "private") {
            return typeof value === "string" && value.trim().length > 0;
          }
          return true;
        },
        message: "Password is required for private auctions",
      },
      select: false,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      select: false,
    },
  },
  { timestamps: true }
);

auctionSchema.pre("save", function (next) {
  if (this.privacy === "private" && this.isModified("password")) {
    this.password = bcrypt.hashSync(this.password, 10);
  }
  if (this.privacy === "public") {
    this.password = undefined;
  }
  next();
});

auctionSchema.post("findOneAndDelete", async function (doc) {
  const id = doc._id;
  const owners = doc.teams.map((team) => team.owner);
  await mongoose
    .model("User")
    .updateMany({ _id: { $in: owners } }, { $pull: { auctions: id } });
});

auctionSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

export const Auction = mongoose.model("Auctions", auctionSchema);
