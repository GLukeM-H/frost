const express = require('express');
const router = express.Router();

// Page Model
const Page = require('../../models/Page');

// @route GET api/pages
// @desc Get All Pages
// @access PUBLIC
router.get('/', (req, res) => {
    Page.find()
        .sort( {creator: 1})
        .then(pages => res.json(pages))
});

// @route POST api/pages
// @desc post a Page
// @access PUBLIC
router.post('/', (req, res) => {
    const newPage = new Page({
        contentComp: req.body.contentComp,
        creator: req.body.creator
    });

    newPage.save().then(page => res.json(page));
});

// @route DELETE api/pages
// @desc delete a Page
// @access
router.delete('/:id', (req, res) => {
    Page.findById(req.params.id)
        .then(page => page.remove().then(() => res.json({ success: true, error: "no error" })))
        .catch(e => res.status(404).json({ success: false, error: e }));
});

module.exports = router;