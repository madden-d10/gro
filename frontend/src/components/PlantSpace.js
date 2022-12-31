import React from 'react';
import '../styles/PlantSpace.css'

function PlantSpace(props)  {
        return (
            <div id={`plant-${props.index}`} className="plant-item" onClick={props.onClick}>
                <p>{props.plant.name}</p>
            </div>
        );
}
  
export default PlantSpace;