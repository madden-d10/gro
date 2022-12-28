import React, { useState, useEffect } from 'react';
import GardenSpace from './GardenSpace';
import '../styles/GardenGrid.css'

function GardenGrid() {
    const [spaces, setSpaces] = useState([
      { id: 1, name: "BOX1", color: "red" },
      { id: 2, name: "BOX2", color: "green" },
      { id: 3, name: "BOX3", color: "blue" },
      { id: 4, name: "BOX4", color: "orange" },
      { id: 5, name: "BOX5", color: "pink" },
      { id: 6, name: "BOX6", color: "yellow" }
    ])

  const swapSpaces = (fromSpace, toSpace) => {
    let slicedSpaces = spaces.slice();
    let fromIndex = -1;
    let toIndex = -1;

    for (let i = 0; i < slicedSpaces.length; i++) {
      if (slicedSpaces[i].id === fromSpace.id)
       {
        fromIndex = i;
      }
      if (slicedSpaces[i].id === toSpace.id) {
        toIndex = i;
      }
    }

    if (fromIndex != -1 && toIndex != -1) {
      let { fromId, ...fromRest } = slicedSpaces[fromIndex];
      let { toId, ...toRest } = slicedSpaces[toIndex];
      slicedSpaces[fromIndex] = { id: fromSpace.id, ...toRest };
      slicedSpaces[toIndex] = { id: toSpace.id, ...fromRest };

      setSpaces(slicedSpaces);
    }
  };

  /* The dragstart event is fired when the user starts dragging an element or text selection */
  /* event.target is the source element : that is dragged */
  /* Firefox requires calling dataTransfer.setData for the drag to properly work */
  const handleDragStart = data => event => {
    let fromSpace = JSON.stringify({ id: data.id });
    event.dataTransfer.setData("dragContent", fromSpace);
  };

  /* The dragover event is fired when an element or text selection is being dragged */
  /* over a valid drop target (every few hundred milliseconds) */
  /* The event is fired on the drop target(s) */
  const handleDragOver = data => event => {
    event.preventDefault(); // Necessary. Allows us to drop.
    return false;
  };

  /* Fired when an element or text selection is dropped on a valid drop target */
  /* The event is fired on the drop target(s) */
  const handleDrop = data => event => {
    event.preventDefault();

    let fromSpace = JSON.parse(event.dataTransfer.getData("dragContent"));
    let toSpace = { id: data.id };

    swapSpaces(fromSpace, toSpace);
    return false;
  };

  const makeSpaces = () => {
    return spaces.map(space => (
      <GardenSpace
        space={space}
        key={space.id}
        draggable="true"
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      />
    ));
  };

  return <div className="GardenGrid">{makeSpaces()}</div>;
}

// ReactDOM.render(<GardenGrid />, document.getElementById("app"));

export default GardenGrid;
