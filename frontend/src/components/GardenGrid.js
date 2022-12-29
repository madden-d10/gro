import React, { useState, useEffect } from 'react';
import GardenSpace from './GardenSpace';
import ReactModal from 'react-modal';
import '../styles/GardenGrid.css';

function GardenGrid() {
    const [userInfo, setUserInfo] = useState({});
    const [plants, setPlants] = useState([]);
    const [showModal, setShowModal] = useState(false)
    const [selectedPlant, setSelectedPlant] = useState({})
    const [spaceIndex, setSpaceIndex] = useState(0)
        
    useEffect(() => {
        fetch("http://localhost:9000/gro/api/users/user1")
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

  const handleClick = (i) => {
    setSpaceIndex(i)
    setShowModal(true);
  }
    
  const handleCloseModal = () => {
    let items = userInfo.layout;
    // 2. Make a shallow copy of the item you want to mutate
    let item = {...items[spaceIndex]};
    // 3. Replace the property you're intested in
    item = selectedPlant;
    // 4. Put it back into our array. N.B. we *are* mutating the array here, 
    //    but that's why we made a copy first
    items[spaceIndex] = item;
    // 5. Set the state to our new copy
    setUserInfo({layout: items});
    setShowModal(false);
    updateLayout(items)
  }

  const renderSpaces = () => {
    return userInfo.layout?.map((space, i) => (
      <GardenSpace
        space={space}
        id={i}
        key={i}
        draggable="true"
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => handleClick(i)}
      />
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
          <button onClick={handleCloseModal}>Close Modal</button>
          {renderPlantsList()}
        </ReactModal>
      </div>
    </div>
  )
}

export default GardenGrid;
