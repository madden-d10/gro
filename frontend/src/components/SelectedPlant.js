import PlantSpace from "./PlantSpace";
import Tips from "./Tips";
import "../styles/GardenModal.css";

function SelectedPlant(props) {
  const renderUserNotes = (userNotes) => {
    return userNotes.map((note, rowIndex) => (
      <p className={`user-note`} key={rowIndex}>
        {note}
      </p>
    ));
  };

  return (
    <div>
        <div className="single-plant-container">
					<PlantSpace plant={props.selectedPlant} />
					<button onClick={props.clearSpace}>Clear</button>
				</div>
				<div className="user-notes-container">
					<h2>User Notes:</h2>
					{renderUserNotes(props.selectedPlant.userNotes)}
        </div>
        <Tips selectedPlant={props.selectedPlant} />
    </div>
  );
}

export default SelectedPlant;
