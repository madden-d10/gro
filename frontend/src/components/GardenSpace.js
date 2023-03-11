import React from 'react';
import '../styles/GardenSpace.css'

function GardenSpace(props)  {
    props.space.id = props.id
    const nameWithoutBrackets = props.space.name?.replace(/ *\([^)]*\) */g, "")
    let backgroundImageURL = ''

    if (props.space.name) {
        backgroundImageURL = `/images/${props.space.name.replace(/'/g, "")}/0 ${props.space.name.replace(/'/g, "")}.jpg`
    }

    if (props.space?.isUsed ) {
        return (
            <div className='tooltip'>
                <div
                    className="space"
                    draggable={props.draggable}
                    onDragStart={props.onDragStart({ id: props.id })}
                    onDragOver={props.onDragOver({ id: props.id })}
                    onDrop={props.onDrop({ id: props.id })}
                    onClick={props.onClick}
                    style={{backgroundImage: `url('${backgroundImageURL}')`}}
                    >
                </div>
                <span className="tooltiptext">{nameWithoutBrackets || '[Empty]'}</span>
            </div>

        );
    } else {
        return (
            <div className="empty-space"></div> 
        )
    }

}
  
export default GardenSpace;