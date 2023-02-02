import React, { useState, useEffect } from 'react';
import ReactModal from 'react-modal';
import PlantSpace from './PlantSpace';
import Information from './Information';
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

  const renderModalContent = () => {
    if (!props.selectedPlant._id) {
      return renderAllPlants()
    }

    return renderSelectedPlant()
  };
  
  const renderAllPlants = () => {
    return (
      <div className='plant-area'>
        {
          plants.slice(plantStartIndex, plantStartIndex + 44).map((plant, index) => (
            <PlantSpace key={index} index={index} plant={plant} onClick={() => props.handlePlantSelection(plant, index)} />
          ))
        }
        <div className='button-area'>
            <button onClick={()=> changePage(-44)}>Prev</button>
            <button onClick={()=> changePage(+44)}>Next</button>
        </div>
      </div>
    )
  }

  const renderSelectedPlant = () => {
    return (
      <div>
        <div className='single-plant-area'>
          <PlantSpace plant={props.selectedPlant} />
          <button onClick={props.clearSpace}>Clear</button>
        </div>      
        <Information />
      </div>

    )
  }

  return (
    <ReactModal isOpen={props.showModal}>
      <div className='modal-content'>
          <button className='close-button' onClick={props.closeModal}>Close</button>
          {renderModalContent()}
      </div>
    </ReactModal>
  )
}

export default GardenModal;
