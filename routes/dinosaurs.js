const express = require('express');
const router = express.Router();
const fs = require('fs');

//Index of dinosaurs
router.get('/', function(req, res) {
    //Define variable for JSON data
    var dinos = fs.readFileSync('./dinosaurs.json');
    //Parse JSON data
    var dinoData = JSON.parse(dinos);
    res.render('dinosaurs/index', {dinos: dinoData});
});

router.post('/', function(req, res) {
    var dinos = fs.readFileSync('./dinosaurs.json');
    var dinoData = JSON.parse(dinos);
    dinoData.push(req.body);
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData));
    res.redirect('/dinosaurs');
})

router.get('/edit/:id', function(req, res) {
    var index = parseInt(req.params.id);
    var dinos = fs.readFileSync('./dinosaurs.json');
    var dinoData = JSON.parse(dinos)
    //object needs dino: {name:string, type:string}, dinoIndex:int
    res.render('dinosaurs/edit', {dino: dinoData[index], dinoIndex: index})
})

//Edit one dino
router.put('/:id', function(req, res) {
    //Read the dinos JSON file
    var index = parseInt(req.params.id);
    var dinos = fs.readFileSync('./dinosaurs.json');
    var dinoData = JSON.parse(dinos)
    //Update the dio at the index (req.params.id)
    dinoData[index] = req.body
    //Restringify the dinoDeetz and rewrite the dinosaur.JSON
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))
    //redirect to the dino show
    res.redirect(`/dinosaurs/${index}`)
})

router.delete('/:id', function(req, res) {
    var index = parseInt(req.params.id);
    var dinos = fs.readFileSync('./dinosaurs.json');
    var dinoData = JSON.parse(dinos);
    var deadDino = dinoData.splice(index, 1);
    
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData));
    res.redirect('/dinosaurs')
})

router.get('/new', function(req, res) {
    res.render('dinosaurs/new')
});

router.get('/:id', function(req, res) {
    var index = parseInt(req.params.id);
    var dinos = fs.readFileSync('./dinosaurs.json');
    var dinoData = JSON.parse(dinos);
    res.render('dinosaurs/show', {dino: dinoData[index], dinoIndex:index})
});

router.post('/', function(req,res) {
    var dinos = fs.readFileSync('./dinosaurs.json');
    var dinoData = JSON.parse(dinos);
});

module.exports = router;