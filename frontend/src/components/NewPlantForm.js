import React from "react";

const formFields = ["name", "group", "lifecycle", "flowerTime", "sunRequirements","uses", "looks", 
	"color", "plantHeight", "inflorescenceHeight", "wildlifeAttractant", "suitableLocations", "plantHabit",
	"leaves", "resistances", "soilpH", "spread", "parentage", "childPlants", "fruit", "miscellaneous"]

function NewPlantForm(props) {
  const createNewPlant = (newPlantObj) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPlantObj)
    };

    fetch('http://localhost:9000/gro/api/plants', requestOptions)
      .then(response => response.json())
  }

	const handleSubmit = (event) => {
		event.preventDefault();

		const newPlantObj = {}
		for (const field of formFields) {
			newPlantObj[field] = event.target[field].value || ""
			event.target[field].value = " "
		}

		createNewPlant(newPlantObj)
	}

	const renderFormFields = () => {
		return formFields.map((field, index) => {
			const result = field.replace(/([A-Z])/g, " $1");
			const label = result.charAt(0).toUpperCase() + result.slice(1);
			
			return (
				<label key={index} htmlFor={field}>{label}
					<input id={field} name={field} type="text"></input>
				</label>
			)
		})
	}

	return (
		<form className="new-plant-form" onSubmit={handleSubmit}>
			{renderFormFields()}
			
			<input type="submit" value="Submit"></input>
		</form> 
		)
}

export default NewPlantForm;
