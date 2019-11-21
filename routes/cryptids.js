const express = require('express');
const router = express.Router();
const fs = require('fs');

//Index of cryptids
router.get('/', function(req, res) {
    //Define variable for JSON data
    var crypts = fs.readFileSync('./cryptids.json');
    //Parse JSON data
    var cryptData = JSON.parse(crypts);
    res.render('cryptids/index', {crypts: cryptData});
});

router.post('/', function(req, res) {
    var crypts = fs.readFileSync('./cryptids.json');
    var cryptData = JSON.parse(crypts);
    cryptData.push(req.body);
    fs.writeFileSync('./cryptids.json', JSON.stringify(cryptData));
    res.redirect('/cryptids');
})

router.get('/edit/:id', function(req, res) {
    var index = parseInt(req.params.id);
    var crypts = fs.readFileSync('./cryptids.json');
    var cryptData = JSON.parse(crypts)
    //object needs crypt: {name:string, type:string}, cryptIndex:int
    res.render('cryptids/edit', {crypt: cryptData[index], cryptIndex: index})
})

//Edit one crypt
router.put('/:id', function(req, res) {
    //Read the crypts JSON file
    var index = parseInt(req.params.id);
    var crypts = fs.readFileSync('./cryptids.json');
    var cryptData = JSON.parse(crypts);
    cryptData[index] = req.body;
    fs.writeFileSync('./cryptids.json', JSON.stringify(cryptData));
    res.redirect(`/cryptids/${index}`);
})

router.delete('/:id', function(req, res) {
    var index = parseInt(req.params.id);
    var crypts = fs.readFileSync('./cryptids.json');
    var cryptData = JSON.parse(crypts);
    var deadcrypt = cryptData.splice(index, 1);
    
    fs.writeFileSync('./cryptids.json', JSON.stringify(cryptData));
    res.redirect('/cryptids')
})

router.get('/new', function(req, res) {
    res.render('cryptids/new')
});

router.get('/:id', function(req, res) {
    var index = parseInt(req.params.id);
    var crypts = fs.readFileSync('./cryptids.json');
    var cryptData = JSON.parse(crypts);
    res.render('cryptids/show', {crypt: cryptData[index], cryptIndex:index})
});

router.post('/', function(req,res) {
    var crypts = fs.readFileSync('./cryptids.json');
    var cryptData = JSON.parse(crypts);
});

module.exports = router;