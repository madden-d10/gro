import React, { useState } from 'react';
import GardenSpace from './GardenSpace';
import GardenModal from './GardenModal'
import '../styles/GardenGrid.css';

function GardenGrid(props) {
  const [userInfo, setUserInfo] = useState(props.userInfo);
  const [showModal, setShowModal] = useState(false)
  const [selectedPlant, setSelectedPlant] = useState({})
  const [rowIndex, setRowIndex] = useState(0)
  const [spaceIndex, setSpaceIndex] = useState(0)

  const updateLayout = (newLayout) => {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newLayout)
    };

    fetch(`http://localhost:9000/gro/api/users/${props.userInfo.username}`, requestOptions)
      .then(response => response.json())
  }

  const swapSpaces = (fromSpace, toSpace) => {
    // breaks down id into the row and space sections
    // an id of 45 will have rowID = 4 and spaceID = 5
    const fromRowID = fromSpace.id.charAt(0)
    const fromSpaceID = fromSpace.id.charAt(1)
    const toRowID = toSpace.id.charAt(0)
    const toSpaceID = toSpace.id.charAt(1)

    // creates a shallow copy so the state can be updated later
    let slicedRows = userInfo.layout.slice();
    let fromIndex = -1;
    let toIndex = -1;

    // finds the where the space is being moved from and where it will be dropped
    for (let i = 0; i < slicedRows.length; i++) {
      for (let j = 0; j < slicedRows[i].length; j++) {
        if (slicedRows[i][j].id === fromSpace.id) {
          fromIndex = fromSpace.id;
        }
        if (slicedRows[i][j].id === toSpace.id) {
          toIndex = toSpace.id;
        }
      }
    }

    // switches the ids for the spaces being swapped
    if (fromIndex !== -1 && toIndex !== -1) {
      let { id: fromId, ...fromRest } = slicedRows[fromRowID.charCodeAt(0) - 97][fromSpaceID.charCodeAt(0) - 97];
      let { id: toId, ...toRest } = slicedRows[toRowID.charCodeAt(0) - 97][toSpaceID.charCodeAt(0) - 97];
      slicedRows[fromRowID.charCodeAt(0) - 97][fromSpaceID.charCodeAt(0) - 97] = { id: fromSpace.id, ...toRest };
      slicedRows[toRowID.charCodeAt(0) - 97][toSpaceID.charCodeAt(0) - 97] = { id: toSpace.id, ...fromRest };

      setUserInfo({layout: slicedRows});
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

  const openModal = (space, rowIndex, spaceIndex) => {
    setRowIndex(rowIndex)
    setSpaceIndex(spaceIndex)
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
    let userLayout = userInfo.layout;
    // make a shallow copy of the item
    let gardenSpace = {...userLayout[rowIndex][spaceIndex]};
    // replace the property
    gardenSpace = selectedPlant;
    // put it back into the array.
    if(userLayout[rowIndex][spaceIndex] !== gardenSpace) {
      // set the state to the new copy
      gardenSpace.id = `${String.fromCharCode(rowIndex + 97)}${String.fromCharCode(spaceIndex + 97)}`
      gardenSpace.isUsed = true
      userLayout[rowIndex][spaceIndex] = gardenSpace;
      setUserInfo({layout: userLayout});
      updateLayout(userLayout)
    }

    setShowModal(false);
  }

  const renderSpaces = () => {
    return userInfo.layout?.map((row, rowIndex) => (
      <div className={`row`} key={rowIndex}>
        {row.map((space, spaceIndex) => (
          <GardenSpace
            space={space}
            id={space.id}
            key={spaceIndex}
            draggable="true"
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => openModal(space, rowIndex, spaceIndex)}
          />
        ))}
      </div>
    ));
  };

  return (
    <div className="garden-grid-container">
      <h1 className='garden-grid-title'>Your Garden</h1>
      <div className="garden-grid">
        {renderSpaces()}
        <div>
          <GardenModal
            showModal={showModal}
            selectedPlant={selectedPlant}
            rowIndex={rowIndex}
            spaceIndex={spaceIndex}
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
