"use strict";
var express = require('express');
var router = express.Router();
var request = require('request');

/* GET home page. */
router.get('/genre/:id', function(req, res, next) {
  var id = req.params.id;
  request(`https://us.api.iheart.com/api/v2/content/liveStations?countryCode=US&limit=100&genreId=${id}`, function(err,data) {
    var dataArray = JSON.parse(data.body).hits;
    var newArray = [];
    for (let i = 0; i < dataArray.length; i++) {
      let obj = {};
      let key = dataArray[i];
      obj.name = key.name;
      obj.freq = key.freq;
      obj.band = key.band;
      obj.callLetters = key.callLetters;
      obj.description = key.description;
      obj.genre = key.genres[0].name;
      obj.city = key.markets[0].city;
      obj.state = key.markets[0].stateAbbreviation;
      obj.logo = key.logo;
      obj.website = key.website;
      obj.stream = key.streams.hls_stream;
      if (obj.website) {
        if (obj.website.indexOf('www') > -1) {
          obj.website = "http://" + obj.website;
        } else {
          obj.website = "http://www." + obj.website;
        }
      }
      newArray.push(obj);
    }
    res.send(dataArray);
  });
});

router.get('/city/:id', function(req, res, next) {
  var id = req.params.id;
  request(`https://us.api.iheart.com/api/v2/content/liveStations?countryCode=US&limit=100&marketId=${id}`, function(err,data) {
    var dataArray = JSON.parse(data.body).hits;
    var newArray = [];
    for (let i = 0; i < dataArray.length; i++) {
      let obj = {};
      let key = dataArray[i];
      obj.name = key.name;
      obj.freq = key.freq;
      obj.band = key.band;
      obj.callLetters = key.callLetters;
      obj.description = key.description;
      let allGenres = [];
      for (let j = 0; j < key.genres.length; j++) {
        allGenres.push(key.genres[j].name);
      }
      obj.genres = allGenres;
      obj.city = key.markets[0].city;
      obj.state = key.markets[0].stateAbbreviation;
      obj.logo = key.logo;
      obj.website = key.website;
      obj.stream = key.streams.hls_stream;
      if (obj.website) {
        if (obj.website.indexOf('www') > -1) {
          obj.website = "http://" + obj.website;
        } else {
          obj.website = "http://www." + obj.website;
        }
      }
      newArray.push(obj);
    }
    res.send(newArray);
  });
});

module.exports = router;