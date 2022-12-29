import React from 'react';

function GardenSpace(props)  {
    props.space.id = props.id
    return (
        <div
            className="space"
            style={{ backgroundColor: props.space.color || 'white' }}
            draggable={props.draggable}
            onDragStart={props.onDragStart({ id: props.id })}
            onDragOver={props.onDragOver({ id: props.id })}
            onDrop={props.onDrop({ id: props.id })}
            onClick={props.onClick}
            >
            <div className="content">{props.space.name || 'empty'}</div>
        </div>
    );
}
  
export default GardenSpace;