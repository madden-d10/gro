import React, { useState, useEffect } from 'react';
import ReactModal from 'react-modal';
import PlantSpace from './PlantSpace';
import '../styles/GardenModal.css';

function GardenModal(props) {
    const [plants, setPlants] = useState([]);
    const [plantStartIndex, setPlantStartIndex] = useState(0)
        
    useEffect(() => {
        fetch("http://localhost:9000/gro/api/plants")
        .then(res => res.json()) 
        .then(res => setPlants(res))
        .catch(err => err);

        ReactModal.setAppElement('body')
    }, [])

  const changePage = (num) => {
    // because state is be one step behind at this stage, this variable is created twice
    const viewablePlants = plants.slice(plantStartIndex + num, (plantStartIndex + num) + 44)

    if ((plantStartIndex === 0 && num < 0) || viewablePlants.length <= 0) {
      return
    }

    setPlantStartIndex(plantStartIndex + num)
  }

  const renderPlantsList = () => {
    const viewablePlants = plants.slice(plantStartIndex, plantStartIndex + 44)
    return viewablePlants.map((plant, index) => (
      <PlantSpace key={index} index={index} plant={plant} onClick={() => props.handlePlantSelection(plant, index)} />
    ));
  };

  return (
        <ReactModal isOpen={props.showModal} contentLabel="Minimal Modal Example">
          <div className='button-container'>
            <button onClick={props.closeModal}>Close Modal</button>
            <button onClick={props.clearSpace}>Clear Space</button>
          </div>
          <div className='modal-content'>
          <div className='plant-area'>
            {renderPlantsList()}
          </div>
          <div className='button-area'>
            <button onClick={()=> changePage(-44)}>Prev</button>
            <button onClick={()=> changePage(+44)}>Next</button>
          </div>
          </div>
        </ReactModal>
  )
}

export default GardenModal;
