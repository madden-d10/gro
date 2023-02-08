const express = require('express');
const router = express.Router()
const plantModel = require('./models/plantModel');
const userModel = require('./models/userModel')
const bodyParser = require('body-parser')
const doSomething = require('./gardeners world scraper/index')
const jsonParser = bodyParser.json()

router.get('/', async (req, res) => {
    res.send('Hello world')
})

// Create new plant
router.post('/api/plants', async (req, res) => {
    const data = new plantModel({
        name: req.body.name
    })

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})

// Get all plants
router.get('/api/plants', async (req, res) => {
    try{
        const data = await plantModel.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

// Get one plant
router.get('/api/plants/:id', async (req, res) => {
    const id = req.params.id
    try{
        const data = await plantModel.find({ '_id': id });
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

// Get all users
router.get('/api/users', async (req, res) => {
    try{
        const data = await userModel.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

// Get one user
router.get('/api/users/:username', async (req, res) => {
    const username = req.params.username
    try{
        const data = await userModel.find({username: username});
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

// Get one user
router.get('/api/users/:username', async (req, res) => {
    const username = req.params.username
    try{
        const data = await userModel.find({username: username});
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

// Update one user
router.put('/api/users/:username', jsonParser, async (req, res) => {
    const username = req.params.username
    try{
        const data = await userModel.updateOne({username: username}, {layout: req.body});
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

// Update plant in user layout
router.put('/api/users/:username/:rowIndex/:columnIndex', jsonParser, async (req, res) => {
    const username = req.params.username
    const rowIndex = req.params.rowIndex
    const columnIndex = req.params.columnIndex
    try{
        const data = await userModel.find({ username : username });
        data[0].layout[rowIndex][columnIndex].userNotes = req.body;
        
        const newData = await userModel.updateOne({username: username}, {layout: data[0].layout});
        res.json(newData)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

// Get by ID Method
router.get('/api/plants/:id', (req, res) => {
    res.send('Get by ID API')
})

// Update by ID Method
router.put('/api/plants/:id', async (req, res) => {
    res.send('Get by ID API')
})

// Delete by ID Method
router.delete('/api/plants/:id', (req, res) => {
    res.send('Delete by ID API')
})

// Get tip
router.get('/api/tip/:endOfURL', async (req, res) => {
    const endOfURL = req.params.endOfURL.replaceAll('_', '/');
    try{
        const data = await doSomething(endOfURL);
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

module.exports = router;