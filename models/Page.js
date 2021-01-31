const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const PageSchema = new Schema({
    tree: Object,
    creator: String
});

module.exports = Page = mongoose.model('page', PageSchema);