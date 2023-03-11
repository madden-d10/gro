import { useState, useEffect } from 'react';
import PlantSpace from "./PlantSpace";
import Tips from "./Tips";
import "../styles/GardenModal.css";

function SelectedPlant(props) {
  const [userNotes, setUserNotes] = useState([])

  useEffect(() => {
    const username = sessionStorage.getItem('username')

    fetch(`http://localhost:9000/gro/api/users/${username}`)
    .then(response => response.json())
    .then(response => {
      for (const row of response[0]?.layout) {
        for (const space of row) {
          if (space.id === props.selectedPlant.id) {
            setUserNotes(space.userNotes)
          }
        }
      }
    })
  }, [userNotes])

  const renderUserNotes = () => {
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
					{renderUserNotes(userNotes)}
        </div>
        <Tips selectedPlant={props.selectedPlant} userNotes={userNotes} setUserNotes={setUserNotes}/>
    </div>
  );
}

export default SelectedPlant;
