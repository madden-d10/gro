import ReactModal from "react-modal";
import AllPlants from "./AllPlants";
import SelectedPlant from "./SelectedPlant";
import "../styles/GardenModal.css";

function GardenModal(props) {
  ReactModal.setAppElement("body");
  
  const existingPlantOptions = () => {
    if (!props.selectedPlant._id) {
      return <AllPlants handlePlantSelection={props.handlePlantSelection} />;
    }

    return <SelectedPlant selectedPlant={props.selectedPlant} clearSpace={props.clearSpace} />;
  };

  return (
    <ReactModal isOpen={props.showModal}>
        <button className="close-button" onClick={props.closeModal}>
          Close
        </button>
        {existingPlantOptions()}
    </ReactModal>
  );
}

export default GardenModal;
