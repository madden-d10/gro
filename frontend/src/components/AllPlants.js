import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import PlantSpace from "./PlantSpace";
import NewPlantForm from "./NewPlantForm";
import "../styles/GardenModal.css";

function AllPlants(props) {
  const [plants, setPlants] = useState([]);
  const [plantStartIndex, setPlantStartIndex] = useState(0);
  const [plantEndIndex, setPlantEndIndex] = useState(44);
	const [addingNewPlant, setAddingNewPlant] = useState(false);

  useEffect(() => {
    fetch("http://localhost:9000/gro/api/plants")
      .then((res) => res.json())
      .then((res) => setPlants(res))
      .catch((err) => err);
  }, []);

  const changePage = (num) => {
    const viewablePlants = plants.slice((plantStartIndex + num), (plantEndIndex + num));

    if ((plantStartIndex === 0 && num < 0) || viewablePlants.length <= 0) {
      return;
    }

    setPlantStartIndex(plantStartIndex + num);
    setPlantEndIndex(plantEndIndex + num)
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

		)
	}

  return (
		<div className="all-plants">
			<button onClick={() => setAddingNewPlant(!addingNewPlant)}>{addingNewPlant ? 'Back' : 'Add Plant'}</button>			
			{!addingNewPlant && renderAllPlants() || <NewPlantForm changeAddingNewPlant={setAddingNewPlant} />}
		</div>
  );
}

export default AllPlants;
