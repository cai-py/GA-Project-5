const express = require('express')
const { create } = require('../models/library_schema.js')
const library = express.Router()
const Library = require("../models/library_schema.js")
const songsSeed = require('../models/library_seed.js')


// //===========================
// //  SEED ROUTE -works
// //===========================

library.get('/seed', (req,res) => {
    Library.insertMany(songsSeed, (err, manySongs) => {
        Library.find({}, (err, foundSongs) => {
            res.json(foundSongs)
        })
    })
})

// //======================
// //  INDEX ROUTE -works
// //======================

library.get('/', (req, res) => {
    Library.find({}, (err, foundSongs) => {
        res.json(foundSongs)
    })
})


// //========================
// // CREATE ROUTE -works
// //========================

library.post('/new', (req, res) => {
    Library.create(req.body, (err, createdSong) => {
        Library.find({}, (err, foundSongs) => {
            res.json(foundSongs) 
        })
    })
})

// //=========================
// //  UPDATE ROUTE -works
// //=========================

library.put('/:id', (req, res) => {
    Library.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    }, (err, updatedSong) => {
        if (err) {
            res.send(err)
        } else {
            Library.find({}, (err, foundSongs) => {
                res.json(foundSongs)
            })
        }
    })
})

// //===========================
// //  DELETE ROUTE -works
// //===========================

library.delete('/:id', (req, res) => {
    Library.findByIdAndRemove(req.params.id, (err, deletedSong) => {
        Library.find({}, (err, foundSong) => {
            res.json(foundSong)
        })
    })
})


// EXPORTS
module.exports = library