import React from 'react';
import '../styles/PlantSpace.css'

const plantInfo = ["group", "lifecycle", "flowerTime", "sunRequirements", "uses"]
const extraPlantInfo = ["group", "lifecycle", "flowerTime", "sunRequirements", "uses", "containers", 
    "leaves", "wildlifeAttractant", "spread", "plantHeight", "miscellaneous"]

function PlantSpace(props)  {
    let imageURL = ''

    if (props.plant.name) {
        imageURL = `/images/${props.plant?.name.replace(/'/g, "")}/0 ${props.plant?.name.replace(/'/g, "")}.jpg`
    }

    const renderPlantInfo = () => {
        let arr = plantInfo
        if (props.isSelectedPlant) {
            arr = extraPlantInfo
        }

        return arr.map((info, index) => {
			const result = info.replace(/([A-Z])/g, " $1");
			const label = result.charAt(0).toUpperCase() + result.slice(1);
		
			return (
                <p key={index}><b>{label}: </b>{props.plant[info]}</p>
			)
		})
    }

    return (
        <div id={`plant-${props.index}`} className={`plant-item ${props.isSelectedPlant}`} onClick={props.onClick}>
            <div>
                <img src={`${imageURL}`} alt='plant image'/>
                <p>{props.plant.name}</p> 
            </div>
            <hr />
            {renderPlantInfo()}
        </div>
    );
}
  
export default PlantSpace;