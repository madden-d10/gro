import React, { useState } from 'react';
import GardenSpace from './GardenSpace';
import GardenModal from './GardenModal'
import '../styles/GardenGrid.css';

function GardenGrid(props) {
  const [showModal, setShowModal] = useState(false)
  const [selectedPlant, setSelectedPlant] = useState({})
  const [selectedSpace, setSelectedSpace] = useState({})
  const username = sessionStorage.getItem('username');

  const updateLayout = (newLayout) => {
  const username = sessionStorage.getItem('username');

    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newLayout)
    };

    fetch(`http://localhost:9000/gro/api/users/${username}`, requestOptions)
      .then(response => response.json())
  }

  const swapSpaces = (fromSpace, toSpace) => {
    // creates a shallow copy so the state can be updated later
    let slicedRows = props.userInfo.layout.slice();
    let fromIndex = -1;
    let toIndex = -1;
    let fromRowIndex = 0
    let fromSpaceIndex = 0
    let toRowIndex = 0
    let toSpaceIndex = 0

    // finds the where the space is being moved from and where it will be dropped
    for (let i = 0; i < slicedRows.length; i++) {
      for (let j = 0; j < slicedRows[i].length; j++) {
        if (slicedRows[i][j].id === fromSpace.id) {
          fromIndex = fromSpace.id;
          fromRowIndex = i
          fromSpaceIndex = j
        }
        if (slicedRows[i][j].id === toSpace.id) {
          toIndex = toSpace.id;
          toRowIndex = i
          toSpaceIndex = j
        }
      }
    }

    // switches the ids for the spaces being swapped
    if (fromIndex !== -1 && toIndex !== -1) {
      let { id: fromIndex, ...fromRest } = slicedRows[fromRowIndex][fromSpaceIndex];
      let { id: toIndex, ...toRest } = slicedRows[toRowIndex][toSpaceIndex];
      slicedRows[fromRowIndex][fromSpaceIndex] = { id: fromSpace.id, ...toRest };
      slicedRows[toRowIndex][toSpaceIndex] = { id: toSpace.id, ...fromRest };

      props.setUserInfo({layout: slicedRows});
      updateLayout(slicedRows)
    };
  }

  const handleDragStart = data => event => {
    let fromSpace = JSON.stringify({ id: data.id });
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("dragContent", fromSpace);
  };

  const handleDragOver = data => event => {
    // necessary, allows drop.
    event.preventDefault();
    return false;
  };

  const handleDrop = data => event => {
    event.preventDefault();

    let fromSpace = JSON.parse(event.dataTransfer.getData("dragContent"));
    let toSpace = { id: data.id };

    swapSpaces(fromSpace, toSpace);
    return false;
  };

  const openModal = (space) => {
    setSelectedSpace(space)
    setSelectedPlant(space)
    setShowModal(true);
  }

  const handlePlantSelection = (plant) => {
    setSelectedPlant(plant)
  }

  const clearSpace = () => {
    setSelectedPlant({})
  }

  const closeModal = async () => {
    let userLayout = props.userInfo.layout;
    let gardenSpace = {}
    let rowIndex = 0;
    let spaceIndex = 0;
    let i = 0;
    let j = 0;
    
    // replace the property
    gardenSpace = {id: selectedSpace.id, ...selectedPlant};

    for (const row of userLayout) {
      j = 0
      for(const space of row) {
        if (space.id === gardenSpace.id) {
          rowIndex = i;
          spaceIndex= j;
        }
        j++
      }
      i++
    }

    // put it back into the array.
    if(userLayout[rowIndex][spaceIndex] !== gardenSpace) {
      // set the state to the new copy
      gardenSpace.isUsed = true
      userLayout[rowIndex][spaceIndex] = gardenSpace;
      props.setUserInfo({layout: userLayout});
      updateLayout(userLayout)
    }

    setShowModal(false);
  }

  const renderSpaces = () => {
    return props.userInfo.layout?.map((row, rowIndex) => (
      <div className={`row`} key={rowIndex}>
        {row.map((space) => (
          <GardenSpace
            space={space}
            id={space.id}
            key={space.id}
            draggable="true"
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => openModal(space)}
          />
        ))}
      </div>
    ));
  };

  return (
    <div className="garden-grid-container">
      <h2 className='garden-grid-title'>{username}'s Garden</h2>
      <div className="garden-grid">
        {renderSpaces()}
        <div>
          <GardenModal
            showModal={showModal}
            selectedPlant={selectedPlant}
            closeModal={closeModal}
            clearSpace={clearSpace}
            handlePlantSelection={handlePlantSelection}>
          </GardenModal>
        </div>
      </div>
    </div>
  )
}

export default GardenGrid;
