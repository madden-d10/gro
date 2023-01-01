import React from 'react';
import '../styles/GardenSpace.css'

function GardenSpace(props)  {
    props.space.id = props.id
    const nameWithoutBrackets = props.space.name?.replace(/ *\([^)]*\) */g, "")
    let backgroundImageURL = ''

    if (props.space.name) {
        backgroundImageURL = '/images/26bf40a603.jpg'
    }

    if (props.space?.isUsed ) {
        return (
            <div
                className="space"
                draggable={props.draggable}
                onDragStart={props.onDragStart({ id: props.id })}
                onDragOver={props.onDragOver({ id: props.id })}
                onDrop={props.onDrop({ id: props.id })}
                onClick={props.onClick}
                style={{backgroundImage: `url('${backgroundImageURL}')`}}
                >
                <div className='text-container'>
                    <p className="content">
                        {nameWithoutBrackets}
                    </p>
                </div>
            </div>
        );
    } else {
        return (
            <div className="empty-space"></div> 
        )
    }

}
  
export default GardenSpace;