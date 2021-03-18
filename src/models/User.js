const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
	name: String,
	username: { type: String, required: true },
	password: { type: String, required: true },
	email: String,
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
