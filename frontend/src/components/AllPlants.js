import React, { useState, useEffect } from "react";
import PlantSpace from "./PlantSpace";
import NewPlantForm from "./NewPlantForm";
import "../styles/GardenModal.css";

let allPlants = []

function AllPlants(props) {
  const [plants, setPlants] = useState([]);
  const [plantStartIndex, setPlantStartIndex] = useState(0);
  const [plantEndIndex, setPlantEndIndex] = useState(44);
	const [addingNewPlant, setAddingNewPlant] = useState(false);
	const [groupOptions, setGroupOptions] = useState([]);
	const [lifecycleOptions, setLifecycleOptions] = useState([]);
	const [usesOptions, setUsesOptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost:9000/gro/api/plants")
      .then((res) => res.json())
			.then((res) => getFilterOptions(res))
      .catch((err) => err);
  }, []);

	const splitOptions = (str) => {
		return str.split(', ').join('-').split(' or ').join('-').split('-') || [str]
	}

	const getFilterOptions = (response) => {
		const groups = new Set()
		const lifecycles = new Set()
		const uses = new Set()

		for (const plant of response) {
			groups.add(plant.group)

			const splitLifecycles = splitOptions(plant.lifecycle || "")
			for (const lifecycle of splitLifecycles) {
				if (lifecycle !== "") {
					lifecycles.add(lifecycle)
				}
			}

			const splitUses = splitOptions(plant.uses || "")
			for (const use of splitUses) {
				if (use !== "") {
					uses.add(use)
				}
			}
		}

		allPlants = response
		setPlants(response)
		setGroupOptions([...groups]);
		setLifecycleOptions([...lifecycles])
		setUsesOptions([...uses])
	}

  const changePage = (num) => {
    const viewablePlants = plants.slice((plantStartIndex + num), (plantEndIndex + num));

    if ((plantStartIndex === 0 && num < 0) || viewablePlants.length <= 0) {
      return;
    }

    setPlantStartIndex(plantStartIndex + num); 
    setPlantEndIndex(plantEndIndex + num)
  };

	const filterPlants = async () => {
		const selectedGroup = document.querySelector("#plant-group-options").value
		const selectedLifecycle = document.querySelector("#plant-lifecycle-options").value
		const selectedUse = document.querySelector("#plant-uses-options").value
		const filteredPlants = allPlants.filter(plant => {
			return (
				(selectedGroup === "-" ? true : plant.group?.includes(selectedGroup)) &&
				(selectedLifecycle === "-" ? true : plant.lifecycle?.includes(selectedLifecycle)) &&
				(selectedUse === "-" ? true : plant.uses?.includes(selectedUse))
			)
		})
		setPlants(filteredPlants)
	}

	const renderOptions = () => {
		return (
			<div className="options-container">
				<label htmlFor="plant-group-options">Group</label>
				<select id="plant-group-options" onChange={filterPlants}>
					<option>-</option>
					{groupOptions.map((groupOption, index) => (
						<option key={index} value={groupOption}>{groupOption}</option>
					))}
				</select>
				<label htmlFor="plant-lifecycle-options">Lifecycle</label>
				<select id="plant-lifecycle-options" onChange={filterPlants}>
					<option>-</option>
					{lifecycleOptions.map((lifecycleOption, index) => (
						<option key={index} value={lifecycleOption}>{lifecycleOption}</option>
					))}
				</select>
				<label htmlFor="plant-uses-options">Uses</label>
				<select id="plant-uses-options" onChange={filterPlants}>
					<option>-</option>
					{usesOptions.map((usesOption, index) => (
						<option key={index} value={usesOption}>{usesOption}</option>
					))}
				</select>
			</div>
		)
	}

	const getMatchingPlants = (value) => {
    const matchingPlants = []

    for (const plant of allPlants) {
      if (plant.name?.toLowerCase().includes(`${value.toLowerCase()}`)) {
        matchingPlants.push(plant)
      }
    }

    return matchingPlants
  }

  const handleChange = (event) => {
    const { value } = event.target;
		setSearchTerm(value)

    if (value.length === 0) {
      return setPlants(allPlants);
    }

    const matchingPlants = getMatchingPlants(value)
    setPlants(matchingPlants);
  };

	const renderAllPlants = () => {
		return (
			<div>			
				<form className="searchForm">
					<input type={"text"} value={searchTerm} onChange={handleChange}></input>
				</form>
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
