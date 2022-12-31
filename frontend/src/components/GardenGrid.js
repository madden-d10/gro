import React, { useState, useEffect } from 'react';
import GardenSpace from './GardenSpace';
import ReactModal from 'react-modal';
import '../styles/GardenGrid.css';

function GardenGrid() {
    const [userInfo, setUserInfo] = useState({});
    const [plants, setPlants] = useState([]);
    const [showModal, setShowModal] = useState(false)
    const [selectedPlant, setSelectedPlant] = useState({})
    const [rowIndex, setRowIndex] = useState(0)
    const [spaceIndex, setSpaceIndex] = useState(0)
        
    useEffect(() => {
        fetch("http://localhost:9000/gro/api/users/user2")
        .then(res => res.json())
        .then(res => setUserInfo(res[0]))
        .catch(err => err);

        fetch("http://localhost:9000/gro/api/plants")
        .then(res => res.json()) 
        .then(res => setPlants(res))
        .catch(err => err);

        ReactModal.setAppElement('body')
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
    const fromRowID = fromSpace.id.charAt(0)
    const fromSpaceID = fromSpace.id.charAt(1)
    const toRowID = toSpace.id.charAt(0)
    const toSpaceID = toSpace.id.charAt(1)

    let slicedRows = userInfo.layout.slice();
    let fromIndex = -1;
    let toIndex = -1;

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

    if (fromIndex !== -1 && toIndex !== -1) {
      let { id: fromId, ...fromRest } = slicedRows[parseInt(fromRowID)][parseInt(fromSpaceID)];
      let { id: toId, ...toRest } = slicedRows[parseInt(toRowID)][parseInt(toSpaceID)];
      slicedRows[parseInt(fromRowID)][parseInt(fromSpaceID)] = { id: fromSpace.id, ...toRest };
      slicedRows[parseInt(toRowID)][parseInt(toSpaceID)] = { id: toSpace.id, ...fromRest };

      setUserInfo({layout: slicedRows});
      updateLayout(slicedRows)
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

  const openModal = (space, rowIndex, spaceIndex) => {
    setRowIndex(rowIndex)
    setSpaceIndex(spaceIndex)
    setSelectedPlant(space)
    setShowModal(true);
  }
    
  const closeModal = async () => {
    let items = userInfo.layout;
    // 2. Make a shallow copy of the item you want to mutate
    let item = {...items[rowIndex][spaceIndex]};
    // 3. Replace the property you're intested in
    item = selectedPlant;
    // 4. Put it back into our array. N.B. we *are* mutating the array here, 
    //    but that's why we made a copy first
    if(items[rowIndex][spaceIndex] !== item) {
      // 5. Set the state to our new copy
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

  const renderPlantsList = () => {
    return plants.map((plant, i) => (
      <p key={i} onClick={() => setSelectedPlant(plant)}>{plant.name}</p>
    ));
  };

  return (
    <div className="GardenGrid">
      {renderSpaces()}
      <div>
        <ReactModal isOpen={showModal} contentLabel="Minimal Modal Example">
          <button onClick={closeModal}>Close Modal</button>
          <button onClick={() => setSelectedPlant({})}>Clear Space</button>
          {renderPlantsList()}
        </ReactModal>
      </div>
    </div>
  )
}

export default GardenGrid;
