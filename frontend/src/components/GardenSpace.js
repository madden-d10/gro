import React from 'react';
import '../styles/GardenSpace.css'

function GardenSpace(props)  {
    props.space.id = props.id
    if (props.space?.isUsed) {
        return (
            <div
                className="space"
                draggable={props.draggable}
                onDragStart={props.onDragStart({ id: props.id })}
                onDragOver={props.onDragOver({ id: props.id })}
                onDrop={props.onDrop({ id: props.id })}
                onClick={props.onClick}
                >
                <p className="content">
                    {props.space.name}
                </p>
            </div>
        );
    } else {
        return (
            <div className="empty-space"></div> 
        )
    }

}
  
export default GardenSpace;