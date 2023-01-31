import React, { useState, useEffect } from 'react';
import GardenSpace from './GardenSpace';
import GardenModal from './GardenModal'
import '../styles/GardenGrid.css';

function GardenGrid() {
  const [userInfo, setUserInfo] = useState({});
  const [showModal, setShowModal] = useState(false)
  const [selectedPlant, setSelectedPlant] = useState({})
  const [rowIndex, setRowIndex] = useState(0)
  const [spaceIndex, setSpaceIndex] = useState(0)
      
  useEffect(() => {
      fetch("http://localhost:9000/gro/api/users/user2")
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

    fetch('http://localhost:9000/gro/api/users/user2', requestOptions)
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
      let { id: fromId, ...fromRest } = slicedRows[parseInt(fromRowID)][parseInt(fromSpaceID)];
      let { id: toId, ...toRest } = slicedRows[parseInt(toRowID)][parseInt(toSpaceID)];
      slicedRows[parseInt(fromRowID)][parseInt(fromSpaceID)] = { id: fromSpace.id, ...toRest };
      slicedRows[parseInt(toRowID)][parseInt(toSpaceID)] = { id: toSpace.id, ...fromRest };

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
    let items = userInfo.layout;
    // make a shallow copy of the item
    let item = {...items[rowIndex][spaceIndex]};
    // replace the property
    item = selectedPlant;
    // put it back into the array.
    if(items[rowIndex][spaceIndex] !== item) {
      // set the state to the new copy
      item.id = `${rowIndex}${spaceIndex}`
      item.isUsed = true
      items[rowIndex][spaceIndex] = item;
      setUserInfo({layout: items});
      updateLayout(items)
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
            key={space.id}
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
    <div className="GardenGrid">
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
  )
}

export default GardenGrid;
