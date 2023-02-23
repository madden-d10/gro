import ReactModal from "react-modal";
import AllPlants from "./AllPlants";
import SelectedPlant from "./SelectedPlant";
import "../styles/GardenModal.css";

function GardenModal(props) {
  const renderModalContent = () => {
    if (!props.selectedPlant._id) {
      return <AllPlants handlePlantSelection={props.handlePlantSelection} />;
    }

    return <SelectedPlant selectedPlant={props.selectedPlant} clearSpace={props.clearSpace} />;
  };

  return (
    <ReactModal isOpen={props.showModal} appElement={document.querySelector('#root')}>
      <div className="modal-content">
        <button className="close-button" onClick={props.closeModal}>
          Close
        </button>
        {renderModalContent()}
      </div>
    </ReactModal>
  );
}

export default GardenModal;
