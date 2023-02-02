const mongoose = require('mongoose');

const plantSchema = new mongoose.Schema({
    group: { type: String },
    name: { type: String },
    url: { type: String },
    containers: { type: String },
    flowerTime: { type: String },
    looks: { type: String },
    leaves: { type: String },
    lifecycle: { type: String },
    miscellaneous: { type: String },
    plantHabit: { type: String },
    resistances: { type: String },
    soilpH: { type: String },
    suitableLocations: { type: String },
    sunRequirements: { type: String },
    uses: { type: String },
    wildlifeAttractant: { type: String },
    color: { type: String },
    inflorescenceHeight: { type: String },
    spread: { type: String },
    awards: { type: String },
    parentage: { type: String },
    childPlants: { type: String },
    plantHeight: { type: String },
    fruit: { type: String }
})

module.exports = mongoose.model('plants', plantSchema)