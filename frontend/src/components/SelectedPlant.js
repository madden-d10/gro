import PlantSpace from "./PlantSpace";
import Information from "./Tips";
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
        <Information rowIndex={props.rowIndex} spaceIndex={props.spaceIndex} />
    </div>
  );
}

export default SelectedPlant;
