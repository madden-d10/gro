import React, { useState, useEffect } from 'react';
import GardenSpace from './GardenSpace';
import '../styles/GardenGrid.css'

function GardenGrid() {
    const [userInfo, setUserInfo] = useState({layout: []});
        
    useEffect(() => {
        fetch("http://localhost:9000/gro/api/users/user1")
        .then(res => res.json())
        .then(res => setUserInfo(res[0]))
        .catch(err => err);
    }, [])

  const updateLayout = (newLayout) => {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newLayout)
    };

    fetch('http://localhost:9000/gro/api/users/user1', requestOptions)
      .then(response => response.json())
  }

  const swapSpaces = (fromSpace, toSpace) => {
    let slicedSpaces = userInfo.layout.slice();
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

      setUserInfo({layout: slicedSpaces});
      updateLayout(slicedSpaces)
    };
  }


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
    return userInfo.layout?.map((space, i) => (
      <GardenSpace
        space={space}
        key={i}
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
