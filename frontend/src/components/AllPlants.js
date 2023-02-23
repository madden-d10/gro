import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import PlantSpace from "./PlantSpace";
import "../styles/GardenModal.css";

function AllPlants(props) {
  const [plants, setPlants] = useState([]);
  const [plantStartIndex, setPlantStartIndex] = useState(0);
  const [plantEndIndex, setPlantEndIndex] = useState(44);

  useEffect(() => {
    fetch("http://localhost:9000/gro/api/plants")
      .then((res) => res.json())
      .then((res) => setPlants(res))
      .catch((err) => err);

    ReactModal.setAppElement("body");
  }, []);

  const changePage = (num) => {
    const viewablePlants = plants.slice((plantStartIndex + num), (plantEndIndex + num));

    if ((plantStartIndex === 0 && num < 0) || viewablePlants.length <= 0) {
      return;
    }

    setPlantStartIndex(plantStartIndex + num);
    setPlantEndIndex(plantEndIndex + num)
  };

  return (
    <div className="plant-container">
        {plants.slice(plantStartIndex, plantEndIndex).map((plant, index) => (
            <PlantSpace
              key={index}
              index={index}
              plant={plant}
              onClick={() => props.handlePlantSelection(plant, index)}
            />
          ))}
        <div className="button-container">
          <button onClick={() => changePage(-44)}>Prev</button>
          <button onClick={() => changePage(+44)}>Next</button>
        </div>
      </div>
  );
}

export default AllPlants;
