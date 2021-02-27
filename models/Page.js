const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const PageSchema = new Schema({
    contentComp: Object,
    creator: String
});

module.exports = Page = mongoose.model('page', PageSchema);