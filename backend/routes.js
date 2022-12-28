const express = require('express');
const router = express.Router()
const plantModel = require('./plantModel');
const userModel = require('./userModel')

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

//Get by ID Method
router.get('/api/plants/:id', (req, res) => {
    res.send('Get by ID API')
})

//Update by ID Method
router.patch('/api/plants/:id', (req, res) => {
    res.send('Update by ID API')
})

//Delete by ID Method
router.delete('/api/plants/:id', (req, res) => {
    res.send('Delete by ID API')
})

module.exports = router;