var Bicicleta = require('../../models/bicicleta');

exports.bicicleta_list= function(req, res){
    Bicicleta.allBicis(function(err, bicis){
        res.status(200).json({
            bicicletas: Bicicleta.allBicis
        });
    });
}
    
exports.bicicleta_create = function(req, res){
  var bici = new Bicicleta({code: req.body.id, color: req.body.color, modelo: req.body.modelo, ubicacion: [req.body.lat, req.body.lng]});

  Bicicleta.add(bici)

  res.status(200).json({
    bicicleta: bici,
  }) 
};

exports.bicicleta_delete = function(req, res){
  Bicicleta.removeByCode(req.body.code, function(err, bici){
    res.status(204).send();      
  });
};