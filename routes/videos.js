var express = require('express');
var router = express.Router();
var fs = require('fs');
var Upload = require('../models/video');
var multer = require('multer');
var video = multer({dest: 'public/videos/'});

//GET para listar todos os arquivos/dados do banco de dados
router.get('/', function (req, res, next) {
  //console.log(req.params);
  Upload.find({},  function (err, videos) {
    if (err) next(err);
    else {
      res.send(videos);
    }
  });
});

//GET para um arquivo específico para tocar no player
router.get('/:uuid/:filename', function (req, res, next) {
  //console.log(req.params);
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

//GET usando apenas o ID, usado para mostrar mais detalhes do vídeo
router.get('/:id', function (req, res, next) {
  Upload.findOne({
    '_id': id
  }, function (err, video) {
    if (err) next(err);
    else {
      res.json(video);
    }
  });
});

//DELETE vídeo baseado no ID
router.delete('/:id', function (req, res, next) {
  Upload.findOne({'_id': req.params.id }, function (err, video) {
    if (err) next(err);
    else {
      //console.log(video);
      video.remove();
      res.json({item: video});
    }
  });
});

//PUT vídeo baseado em seu ID
router.put('/:id', function(req, res) {
    var videoInfo = req.body;
    var id = req.params.id;
    //console.log(videoInfo);

    Upload.update(
        {_id: id },
        videoInfo,
        { upsert: true},
        function(err, video) {
            if (err) res.send(err);
            res.json(video);
    });

});

//POST para criação de vídeo
router.post('/', video.single('file'), function (req, res, next) {
  //console.log(req.body);
  //console.log(req.file);
  var newUpload = {
    title: req.body.title,
    category: req.body.category,
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