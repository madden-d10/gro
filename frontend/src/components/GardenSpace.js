import React from 'react';

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
                <div className="content">{props.space.name || 'empty'}</div>
            </div>
        );
    } else {
        return (
            <div
            className="space"
            style={{ backgroundColor: 'white'}}
            >
        </div> 
        )
    }

}
  
export default GardenSpace;