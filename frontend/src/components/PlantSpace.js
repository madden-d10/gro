import React from 'react';
import '../styles/PlantSpace.css'

function PlantSpace(props)  {
    let imageURL = ''

    if (props.plant.name) {
        imageURL = `/images/${props.plant?.name.replace(/'/g, "")}/0 ${props.plant?.name.replace(/'/g, "")}.jpg`
    }

    return (
        <div id={`plant-${props.index}`} className="plant-item" onClick={props.onClick}>
            <div>
                <img src={`${imageURL}`} />
                <p>{props.plant.name}</p> 
            </div>
            <hr />
            <p><b>Group: </b>{props.plant.group}</p>
            <p><b>Lifecycle: </b>{props.plant.lifecycle}</p>
            <p><b>Flower Time: </b>{props.plant.flowerTime}</p>
            <p><b>Sun Requirements: </b>{props.plant.sunRequirements}</p>
            <p><b>Uses: </b>{props.plant.uses}</p>
        </div>
    );
}
  
export default PlantSpace;