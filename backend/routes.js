const express = require("express");
const router = express.Router();
const plantModel = require("./models/plantModel");
const userModel = require("./models/userModel");
const bodyParser = require("body-parser");
const getTipsGardenersWorld = require("./gardeners world tips scraper/index");
const getTipsRHS = require("./rhs tips scraper/index");
const jsonParser = bodyParser.json();
const fs = require("fs");
const fileupload = require('express-fileupload')
const bcrypt = require("bcrypt")

router.get("/", async (req, res) => {
  res.send("Hello world");
});

router.post("/api/login", jsonParser, async (req, res) => {
  const username = req.body.username
  const password = req.body.password
  let data;

  try {
    data = await userModel.find({ username: username });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  if (data.length <= 0) {
    return res.status(401).json({ message: 'Incorrect username or password'})
  }

  bcrypt.compare(password, data[0].password)
  .then(result => {
    if (result) {
      res.json(data);
    } else {
      res.status(401).json({ message: 'Incorrect username or password'})
    }
  })
});

// Create new plant
router.post("/api/plants", jsonParser, async (req, res) => {
  const data = new plantModel({
    name: req.body.name,
    group: req.body.group,
    lifecycle: req.body.lifecycle,
    flowerTime: req.body.flowerTime,
    sunRequirements: req.body.sunRequirements,
    uses: req.body.uses,
    looks: req.body.looks,
    color: req.body.color,
    plantHeight: req.body.plantHeight,
    inflorescenceHeight: req.body.inflorescenceHeight,
    wildlifeAttractant: req.body.wildlifeAttractant,
    suitableLocations: req.body.suitableLocations,
    plantHabit: req.body.plantHabit,
    leaves: req.body.leaves,
    resistances: req.body.resistances,
    soilpH: req.body.soilpH,
    spread: req.body.spread,
    parentage: req.body.parentage,
    childPlants: req.body.childPlants,
    fruit: req.body.fruit,
    miscellaneous: req.body.miscellaneous,
    userNotes: [],
  });

	const path = '../gro/frontend/public/images/' + req.body.name;

	fs.access(path, (error) => {
		// To check if the given directory 
		// already exists or not
		if (error) {
			// If current directory does not exist
			// then create it
			fs.mkdir(path, (error) => {
				if (error) {
					console.log(error);
				} else {
					console.log("New Directory created successfully !!");
				}
			});
		} else {
			console.log("Given Directory already exists !!");
		}
	});

	try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Upload new image
router.post("/api/plants/image", fileupload(), async (req, res) => {
	const name = req.body.name
  const path = `../gro/frontend/public/images/${name}/0 ${name}.jpg`

  req.files.image.mv(path, (error) => {
    if (error) {
      console.error(error)
      res.writeHead(500, {
        'Content-Type': 'image/jpeg'
      })
      res.end(JSON.stringify({ status: 'error', message: error }))
      return
    }

    res.writeHead(200, {
      'Content-Type': 'image/jpeg'
    })
    res.end(JSON.stringify({ status: 'success' }))
  })
});

// Get all plants
router.get("/api/plants", async (req, res) => {
  try {
    const data = await plantModel.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get one plant
router.get("/api/plants/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const data = await plantModel.find({ _id: id });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all users
router.get("/api/users", async (req, res) => {
  try {
    const data = await userModel.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get one user
router.get("/api/users/:username", async (req, res) => {
  const username = req.params.username;
  try {
    const data = await userModel.find({ username: username });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get one user
router.get("/api/users/:username", async (req, res) => {
  const username = req.params.username;
  try {
    const data = await userModel.find({ username: username });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update one user
router.put("/api/users/:username", jsonParser, async (req, res) => {
  const username = req.params.username;
  try {
    const data = await userModel.updateOne(
      { username: username },
      { layout: req.body }
    );
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update user notes in plant in user layout
router.put("/api/users/:username/:rowIndex/:columnIndex", jsonParser, async (req, res) => {
    const username = req.params.username;
    const rowIndex = req.params.rowIndex;
    const columnIndex = req.params.columnIndex;
    
    try {
      const data = await userModel.find({ username: username });
      data[0].layout[rowIndex][columnIndex].userNotes.push(req.body);

      const newData = await userModel.updateOne(
        { username: username },
        { layout: data[0].layout }
      );
      res.json(newData);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// Get by ID Method
router.get("/api/plants/:id", (req, res) => {
  res.send("Get by ID API");
});

// Update by ID Method
router.put("/api/plants/:id", async (req, res) => {
  res.send("Get by ID API");
});

// Delete by ID Method
router.delete("/api/plants/:id", (req, res) => {
  res.send("Delete by ID API");
});

// Get tips
router.get("/api/tips/:site/:endOfURL", async (req, res) => {
  const endOfURL = decodeURIComponent(req.params.endOfURL);
  const site = req.params.site;

  if (site === "GW") {
    try {
      const data = await getTipsGardenersWorld(endOfURL);
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    try {
      const data = await getTipsRHS(endOfURL);
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
});

module.exports = router;
