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
	const [plantGroupOptions, setPlantGroupOptions] = useState([]);
	const [plantLifecycleOptions, setPlantLifecycleOptions] = useState([]);
	const [plantUsesOptions, setPlantUsesOptions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:9000/gro/api/plants")
      .then((res) => res.json())
			.then((res) => getFilterOptions(res))
      .catch((err) => err);
  }, []);

	const splitOptions = (str) => {
		return str.split(', ').join('-').split(' or ').join('-').split('-') || [str]
	}

	const getFilterOptions = (allPlants) => {
		setPlants(allPlants)
		const allPlantsGroups = new Set()
		const allPlantsLifeCycle = new Set()
		const allPlantsUses = new Set()

		for (const plant of allPlants) {
			allPlantsGroups.add(plant.group)

			const lifecycleOptions = splitOptions(plant.lifecycle || "")
			for (const x of lifecycleOptions) {
				allPlantsLifeCycle.add(x)
			}

			const usesOptions = splitOptions(plant.uses || "")
			for (const option of usesOptions) {
				allPlantsUses.add(option)
			}
		}

		setPlantGroupOptions([...allPlantsGroups]);
		setPlantLifecycleOptions([...allPlantsLifeCycle])
		setPlantUsesOptions([...allPlantsUses])
	}

  const changePage = (num) => {
    const viewablePlants = plants.slice((plantStartIndex + num), (plantEndIndex + num));

    if ((plantStartIndex === 0 && num < 0) || viewablePlants.length <= 0) {
      return;
    }

    setPlantStartIndex(plantStartIndex + num);
    setPlantEndIndex(plantEndIndex + num)
  };

	const filterPlants = (event, type) => {
		const aeoniums = plants.filter(plant => plant[type].includes(event.target.value))
		setPlants(aeoniums)
	}

	const renderOptions = () => {
		return (
			<div className="options-container">
				<select id="plant-group-options" onChange={(event) => filterPlants(event, 'group')}>
					{plantGroupOptions.map((groupOption, index) => (
						<option key={index} value={groupOption}>{groupOption}</option>
					))}
				</select>
				<select id="plant-lifecycle-options" onChange={(event) => filterPlants(event, 'lifecycle')}>
					{plantLifecycleOptions.map((lifecycleOption, index) => (
						<option key={index} value={lifecycleOption}>{lifecycleOption}</option>
					))}
				</select>
				<select id="plant-uses-options" onChange={(event) => filterPlants(event, 'flowerTime')}>
					{plantUsesOptions.map((usesOption, index) => (
						<option key={index} value={usesOption}>{usesOption}</option>
					))}
				</select>
			</div>
		)
	}

	const renderAllPlants = () => {
		return (
			<div>
				{renderOptions()}
				<div className="plant-container">
					{plants?.slice(plantStartIndex, plantEndIndex).map((plant, index) => (
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
