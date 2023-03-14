import React, { useState } from "react";
import "../styles/GardenSetup.css";
import newGarden from "../newGarden";

function GardenSetup(props) {
  const [gardenLayout, setGardenLayout] = useState(newGarden);

  const getSpaceIndexes = (newLayout) => {
    let lowIndex = 0;
    let highIndex = 0;
    let isFirstUsedSpaceFound = false;

    for (let row of newLayout) {
      let currentIndex = 0;

      for (let space of row) {
        if (isFirstUsedSpaceFound) {
          if (space.isUsed && currentIndex < lowIndex) {
            // set lowIndex to the currentIndex if:
            // 1. there is already a lowIndex set from a previous row (isFirstUsedSpaceFound === true)
            // 2. the current space is selected and has a lower index than the first space
            lowIndex = currentIndex;
          }
        } else {
          if (space.isUsed) {
            // this sets the value of the lowIndex to the first space found
            lowIndex = currentIndex;
            isFirstUsedSpaceFound = true;
          }
        }

        if (space.isUsed && currentIndex > highIndex) {
          // the high index is simply set to the index of the used space that is the highest (e.g. the space furthest to the right)
          highIndex = currentIndex;
        }
        currentIndex++;
      }
    }

    return [lowIndex, highIndex];
  };

  const getRowIndexes = (newLayout) => {
    let rowIndexes = [];
    let currentIndex = 0;
    for (let row of newLayout) {
      for (let space of row) {
        if (space.isUsed) {
          // adds the index of each row being used
          rowIndexes.push(currentIndex);
          break;
        }
      }
      currentIndex++;
    }

    const firstRowIndex = rowIndexes[0];
    const lastRowIndex = rowIndexes[rowIndexes.length - 1];
    return [firstRowIndex, lastRowIndex];
  };

  const updateIDs = (newLayout) => {
    let rowIndex = 0;

    // because some rows have been deleted, the ids need to be reset to match the spaces posistion
    // This allows the drag and drop function to work later on
    for (let row of newLayout) {
      let spaceIndex = 0;
      for (let space of row) {
        space.id = `${String.fromCharCode(rowIndex + 97)}${String.fromCharCode(spaceIndex + 97)}`;
        spaceIndex++;
      }
      rowIndex++;
    }

    return newLayout;
  };

  const updateLayout = (newLayout) => {
    const [lowIndex, highIndex] = getSpaceIndexes(newLayout);

    let i = 0;
    for (let row of newLayout) {
      const newRow = row.filter((space, spaceIndex) => {
        return (space.isUsed || (spaceIndex >= lowIndex && spaceIndex <= highIndex));
      });

      if (newRow.length === 0) {
        newLayout.splice(i, 1);
      } else {
        newLayout[i] = newRow;
      }
      i++;
    }

    const [firstRowIndex, lastRowIndex] = getRowIndexes(newLayout);
    // only adds all rows which contain spaces that are being used
    // it also ensures any rows between those rows are included
    newLayout = newLayout.splice(firstRowIndex, (lastRowIndex - firstRowIndex + 1));
    newLayout = updateIDs(newLayout);

    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newLayout),
    };

    fetch(`http://localhost:9000/gro/api/users/${props.username}`, requestOptions)
      .then((response) => response.json())
      .then(window.location.reload());
  };

  const handleClick = (id, rowIndex, spaceIndex) => {
    newGarden[rowIndex][spaceIndex].isUsed = !newGarden[rowIndex][spaceIndex].isUsed;
    setGardenLayout(newGarden);

    if (newGarden[rowIndex][spaceIndex].isUsed) {
      document.getElementById(id).classList.add("selected");
    } else {
      document.getElementById(id).classList.remove("selected");
    }
  };

  const renderSpaces = () => {
    return newGarden.map((row, rowIndex) => (
      <div className={`row`} key={rowIndex}>
        {row.map((space, spaceIndex) => (
          <div
            id={space.id}
            key={`${rowIndex}${spaceIndex}`}
            className={"setup-space"}
            onClick={() => handleClick(space.id, rowIndex, spaceIndex)}
          ></div>
        ))}
      </div>
    ));
  };

  return (
    <div className="garden-setup-container">
      <h1>Garden Setup</h1>
      <p>(<i>Each square represents a 50cm x 50cm area</i>)</p>
      {renderSpaces()}
      <button onClick={() => updateLayout(gardenLayout)}>Create</button>
    </div>
  );
}

export default GardenSetup;
