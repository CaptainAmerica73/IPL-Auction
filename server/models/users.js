import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema({
    userName: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true, match: /.+@.+\..+/},
    password: {type: String, required: true, select: false},
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
    auction: {
        type: mongoose.Schema.Types.ObjectId, ref: "Auction",
        default: null
    },
});

UserSchema.pre("save", function (next) {
    if (this.isModified("password")) {
        this.password = bcrypt.hashSync(this.password, 10);
    }
    next();
});

UserSchema.post("findOneAndDelete", async function (doc) {
    const id = doc._id;
    await mongoose.model("Auction").updateMany({teams: {$elemMatch: {owner: id}}}, {$set: {team: null}});
})

UserSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

export const User = mongoose.model("User", UserSchema);
