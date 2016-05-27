'use strict';

const express = require('express');
const bodyParser = require('body-parser').json();
const ManUnitedPlayer = require('../schema/man_United_Player');

const router = module.exports = exports = express.Router();

router.get('/', (req, res) => {
  ManUnitedPlayer.find({}, (err,data) => {
    if(err) return res.json({
      message: err.message
    });
    res.json(data);
  });
});

router.post('/', bodyParser,  (req, res) => {
  let newManUnitedPlayer = new ManUnitedPlayer(req.body);
  newManUnitedPlayer.save((err, data) => {
    if(err) return res.json({
      message: err.message
    });
    res.json(data);
  });
});

router.put('/', bodyParser, (req, res) => {
  ManUnitedPlayer.findOneAndUpdate({_id: req.body._id}, req.body, (err,data) => {
    if(err) return res.json({message: err.message});
    res.json(data);
  });
});

router.delete('/:id', bodyParser, (req, res) => {
  let _id = req.params.id;
  ManUnitedPlayer.findOneAndRemove({_id}, null, (err,data) => {
    if(err) return res.json({message: err.message});
    res.send('deleted Man United Player with id ' + req.params.id);
  });
});
