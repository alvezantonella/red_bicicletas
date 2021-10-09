var Bicicleta = require('../../models/bicicleta');
var request = require('request');
var server = require('../../bin/www');

var base_url = "http://localhost:5000/api/bicicletas";

describe("Bicicleta API", () => {
    beforeEach(function() {
        var mongoDB = 'mongoDB://localhost/testdb';
        mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

        var db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error'));
        db.once('open', function() {
            console.log('we are connecte to test database');
        });
    });

    afterEach(function(done) {
        Bicicleta.deleteMany({}, function(err, success) {
            if (err) consolo.log(err);
            done();
        });
    });

    describe("GET BICICLETAS /", () => {
        it("Status 200", () => {
            request.get(base_url, function(error, reponse, body) {
                var result = JSON.parse(body);
                expect(response.statusCode).toBe(200);
                expect(result.bicicletas.length).toBe(0);
                done();
            })
        });            
    });

    describe("POST BICICLETAS /create", () => {
        it("Status 200", (done) => {
            var headers = {'content-type' : 'application/json'};
            var aBici = '{"id": 10, "color": "rojo", "modelo": "urbana", "lat": 10, "lng": -64}';
            request.post({
                headers: headers,
                url: base_url + '/create',
                body: aBici
            }, function (error, response, body){
                expect(response.statusCode).toBe(200);
                var bici = JSON.parse(body).bicicleta;
                console.log(bici);
                expect(bici.color).toBe("rojo");
                expect(bici.ubicacion[0].toBe(-34));
                expect(bici.ubicacion[1].toBe(-54));
                done();
            });            
        });
    });
    
    describe("DELETE BICICLETAS /delete", () => {
        it("Status 200", (done) => {
            var a = Bicicleta.createInstance(1, 'negro', 'urbana', [10.974027,-63.864714]);
            Bicicleta.add(a, function(err, newBici) {
                var headers = {'content-type' : 'application:/json'};
            });
        });
    });
}); 