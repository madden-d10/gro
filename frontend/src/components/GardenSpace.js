import React from 'react';
  
function GardenSpace(props)  {
      return (
        <div
          className="space"
          style={{ backgroundColor: props.space.color || 'white' }}
          draggable={props.draggable}
          onDragStart={props.onDragStart({ id: props.space.id })}
          onDragOver={props.onDragOver({ id: props.space.id })}
          onDrop={props.onDrop({ id: props.space.id })}
          >
          <div className="content">{props.space.name || 'empty'}</div>
        </div>
      );
}
  
export default GardenSpace;