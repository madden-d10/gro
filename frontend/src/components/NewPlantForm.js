import React, { useState } from "react";
import "../styles/newPlantForm.css"

const formFields = ["name", "group", "lifecycle", "flowerTime", "sunRequirements", "uses", "plantHeight",  
	"wildlifeAttractant", "leaves", "spread", "miscellaneous"]

function NewPlantForm() {
	const [errorText, setErrorText] = useState('')
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

	const checkFormValdity = () => {
		for (const field of formFields) {
			if ((field === "name" && document.forms[0]["name"].value === "") || (field === "group" && document.forms[0]["group"].value === "")) {
				document.querySelector(`#${field}`).classList.add('error')
				setErrorText("Required fields: name and group")
				document.querySelector(`.error-text`).classList.remove('hide')
				return false
			}
				
			document.querySelector(`#${field}`).classList.remove('error')
		}
			
		if (!document.forms[0]["image"].value.toLowerCase().endsWith(".png") && !document.forms[0]["image"].value.toLowerCase().endsWith(".jpg")) {
			document.querySelector("#image").classList.add('error')
			setErrorText("Invalid image format")
			document.querySelector(`.error-text`).classList.remove('hide')
			return false
		}
		
		document.querySelector("#image").classList.remove('error')
		return true
	}

	const handleSubmit = (event) => {
		event.preventDefault();
		const isFormValid = checkFormValdity();

		if (!isFormValid) {
			return
		}

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
			
			if (field === "name" || field === "group") {
				return (
					<label key={index} htmlFor={field}>{label}*<br/>
						<input id={field} name={field} type="text" />
					</label>
				)
			}

			if (field === "miscellaneous") {
				return (
					<label key={index} htmlFor={field}>{label}<br/>
						<textarea id={field} name={field} type="text" />
					</label>
				)
			}
		
			return (
				<label key={index} htmlFor={field}>{label}<br/>
					<input id={field} name={field} type="text" />
				</label>
			)
		})
	}

	return (
		<div className="form-container">
			<h2>New Plant</h2>
			<form className="new-plant-form" onSubmit={handleSubmit}>
				{renderFormFields()}
				<label htmlFor="image">Plant Image*<br/>
					<input type="file" id="image" name="image" accept="image/png, image/jpeg" />
				</label>
				<p className='error-text hide' ><i>{errorText}</i></p>
				<input type="submit" value="Submit" className="button" />
			</form> 
		</div>
		)
}

export default NewPlantForm;
