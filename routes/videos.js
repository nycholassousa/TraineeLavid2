var express = require('express');
var router = express.Router();
var fs = require('fs');
var Upload = require('../models/video');
var multer = require('multer');
var video = multer({dest: 'public/videos/'});

/**
 * Gets the list of all files from the database
 */
router.get('/', function (req, res, next) {
  Upload.find({},  function (err, videos) {
    if (err) next(err);
    else {
      res.send(videos);
    }
  });
});

/**
 * Gets a file from the hard drive based on the unique ID and the filename
 */
router.get('/:uuid/:filename', function (req, res, next) {
  console.log(req.params);
  Upload.findOne({
    'file.filename': req.params.uuid,
    'file.originalname': req.params.filename
  }, function (err, video) {

    if (err) next(err);
    else {
      res.set({
        "Content-Disposition": 'inline; filename="' + video.file.originalname + '"',
        "Content-Type": video.file.mimetype
      });
      fs.createReadStream(video.file.path).pipe(res);
    }
  });
});

/**
 * Create's the file in the database
 */
router.post('/', video.single('file'), function (req, res, next) {
  console.log(req.body);
  console.log(req.file);
  var newUpload = {
    title: req.body.title,
    author: req.body.author,
    description: req.body.description,
    created_at: Date.now(),
    file: req.file
  };
  Upload.create(newUpload, function (err, next) {
    if (err) {
      next(err);
    } else {
      res.send(newUpload);
    }
  });
});

module.exports = router;