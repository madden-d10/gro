import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import PlantSpace from "./PlantSpace";
import Information from "./Information";
import "../styles/GardenModal.css";

function GardenModal(props) {
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

  const renderModalContent = () => {
    if (!props.selectedPlant._id) {
      return renderAllPlants();
    }

    return renderSelectedPlant();
  };

  const renderAllPlants = () => {
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
  };

  const renderUserNotes = (userNotes) => {
    return userNotes.map((note, rowIndex) => (
      <p className={`user-note`} key={rowIndex}>
        {note}
      </p>
    ));
  };

  const renderSelectedPlant = () => {
    return (
      <div>
        <div className="single-plant-container">
          <PlantSpace plant={props.selectedPlant} />
          <button onClick={props.clearSpace}>Clear</button>
        </div>
        <div className="user-notes-container">
          <h2>User Notes:</h2>
          {renderUserNotes(props.selectedPlant.userNotes)}
        </div>
        <Information rowIndex={props.rowIndex} spaceIndex={props.spaceIndex} />
      </div>
    );
  };

  return (
    <ReactModal isOpen={props.showModal}>
      <div className="modal-content">
        <button className="close-button" onClick={props.closeModal}>
          Close
        </button>
        {renderModalContent()}
      </div>
    </ReactModal>
  );
}

export default GardenModal;
