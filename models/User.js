const mongoose = require("mongoose");
const { Schema } = mongoose;

//Create Schema
const UserSchema = new Schema({
	name: String,
	username: { type: String, required: true },
	password: { type: String, required: true },
	visageId: String,
});

module.exports = { User: mongoose.model("User", UserSchema) };
