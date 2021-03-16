const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const UserSchema = new Schema({
	name: String,
	username: String,
	password: String,
	visage: Object,
});

module.exports = { User: mongoose.model("user", UserSchema) };
