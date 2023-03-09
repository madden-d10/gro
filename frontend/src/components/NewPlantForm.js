import React from "react";
import "../styles/newPlantForm.css"

const formFields = ["name", "group", "lifecycle", "flowerTime", "sunRequirements","uses", "looks", 
	"color", "plantHeight", "inflorescenceHeight", "wildlifeAttractant", "suitableLocations", "plantHabit",
	"leaves", "resistances", "soilpH", "spread", "parentage", "childPlants", "fruit", "miscellaneous"]

function NewPlantForm() {
  const createNewPlant = (newPlantObj, formData) => {
    const newPlantRequestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPlantObj)
    };

		const newImageRequestOptions = {
      method: 'POST',
      body: formData
    };

    fetch('http://localhost:9000/gro/api/plants', newPlantRequestOptions)
      .then(response => response.json())

		fetch('http://localhost:9000/gro/api/plants/image', newImageRequestOptions)
			.then(response => response.json())
  }

	const handleSubmit = (event) => {
		event.preventDefault();

		const newPlantObj = {}
		for (const field of formFields) {
			newPlantObj[field] = event.target[field].value || ""
		}

		const formData = new FormData()
		const imageInput = document.querySelector('#image')
		formData.append('image', imageInput.files[0])
		formData.append('name', event.target.name.value)
		createNewPlant(newPlantObj, formData)

		for (const field of formFields) {
			event.target[field].value = ""
		}
	}

	const renderFormFields = () => {
		return formFields.map((field, index) => {
			const result = field.replace(/([A-Z])/g, " $1");
			const label = result.charAt(0).toUpperCase() + result.slice(1);
			
			return (
				<label key={index} htmlFor={field}>{label}:
					<input id={field} name={field} type="text"></input>
				</label>
			)
		})
	}

	return (
		<div className="form-container">
		<h2>New Plant</h2>
			<form className="new-plant-form" onSubmit={handleSubmit}>
				{renderFormFields()}
				<input type="file" id="image" name="image" />
				<input type="submit" value="Submit" className="button"></input>
			</form> 
		</div>
		)
}

export default NewPlantForm;
