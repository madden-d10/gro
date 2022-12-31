import e from 'cors';
import React, { useState, useEffect } from 'react';
import '../styles/GardenSetup.css';

const newGarden = [
    [{id: '00', isUsed: false}, {id: '01', isUsed: false}, {id: '02', isUsed: false}, {id: '03', isUsed: false}, {id: '04', isUsed: false}, {id: '05', isUsed: false}, {id: '06', isUsed: false}, {id: '07', isUsed: false}],
    [{id: '10', isUsed: false}, {id: '11', isUsed: false}, {id: '12', isUsed: false}, {id: '13', isUsed: false}, {id: '14', isUsed: false}, {id: '15', isUsed: false}, {id: '16', isUsed: false}, {id: '17', isUsed: false}],
    [{id: '20', isUsed: false}, {id: '21', isUsed: false}, {id: '22', isUsed: false}, {id: '23', isUsed: false}, {id: '24', isUsed: false}, {id: '25', isUsed: false}, {id: '26', isUsed: false}, {id: '27', isUsed: false}],
    [{id: '30', isUsed: false}, {id: '31', isUsed: false}, {id: '32', isUsed: false}, {id: '33', isUsed: false}, {id: '34', isUsed: false}, {id: '35', isUsed: false}, {id: '36', isUsed: false}, {id: '37', isUsed: false}],
    [{id: '40', isUsed: false}, {id: '41', isUsed: false}, {id: '42', isUsed: false}, {id: '43', isUsed: false}, {id: '44', isUsed: false}, {id: '45', isUsed: false}, {id: '46', isUsed: false}, {id: '47', isUsed: false}],
    [{id: '50', isUsed: false}, {id: '51', isUsed: false}, {id: '52', isUsed: false}, {id: '53', isUsed: false}, {id: '54', isUsed: false}, {id: '55', isUsed: false}, {id: '56', isUsed: false}, {id: '57', isUsed: false}],
    [{id: '60', isUsed: false}, {id: '61', isUsed: false}, {id: '62', isUsed: false}, {id: '63', isUsed: false}, {id: '64', isUsed: false}, {id: '65', isUsed: false}, {id: '66', isUsed: false}, {id: '67', isUsed: false}],
    [{id: '70', isUsed: false}, {id: '71', isUsed: false}, {id: '72', isUsed: false}, {id: '73', isUsed: false}, {id: '74', isUsed: false}, {id: '75', isUsed: false}, {id: '76', isUsed: false}, {id: '77', isUsed: false}]
]


function GardenGrid() {
    // const [userInfo, setUserInfo] = useState({});
    const [gardenLayout, setGardenLayout] = useState(newGarden);
        
    useEffect(() => {
        fetch("http://localhost:9000/gro/api/users/user2")
        .then(res => res.json())
        // .then(res => setUserInfo(res[0]))
        .catch(err => err);
    }, [])

    const getSpaceIndexes = (newLayout) => {
        let lowIndex = 0;
        let highIndex = 0;
        let isFirstUsedSpaceFound = false
        
        for (let row of newLayout) {  
            let currentIndex = 0; 
            for (let space of row) {
                if (isFirstUsedSpaceFound) {
                    if (space.isUsed && currentIndex < lowIndex) {
                        lowIndex = currentIndex
                    }
                } else {
                    if (space.isUsed) {
                        lowIndex = currentIndex
                        isFirstUsedSpaceFound = true
                    }
                }
                if (space.isUsed && currentIndex > highIndex) {
                    highIndex = currentIndex
                }
                currentIndex++
            }
        }

        return [lowIndex, highIndex]
    }

    const getRowIndexes = (newLayout) => {
        let rowIndexes = []
        let j = 0
        for (let row of newLayout) {
            for (let space of row) {
                if (space.isUsed) {
                    rowIndexes.push(j) 
                    break;
                }
            }
            j++
        }
        const firstRowIndex = rowIndexes[0]
        const lastRowIndex = rowIndexes[rowIndexes.length -1]
    
        return [firstRowIndex, lastRowIndex]
    }

  const updateLayout = (newLayout) => {
    const [lowIndex, highIndex] = getSpaceIndexes(newLayout)

    let i = 0
    for (let row of newLayout) {
        const newRow = row.filter((space, spaceIndex) => {
            return (space.isUsed || (spaceIndex >= lowIndex && spaceIndex <= highIndex))
        });

        if (newRow.length === 0) {
            newLayout.splice(i, 1);  
        } else {
            newLayout[i] = newRow;
        }
        i++
    }

    const [firstRowIndex, lastRowIndex] = getRowIndexes(newLayout)

    newLayout = newLayout.splice(firstRowIndex, ((lastRowIndex - firstRowIndex) + 1));

    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newLayout)
    };

    fetch('http://localhost:9000/gro/api/users/user2', requestOptions)
      .then(response => response.json())
  }

    const handleClick = (rowIndex, spaceIndex) => {
        newGarden[rowIndex][spaceIndex].isUsed = !newGarden[rowIndex][spaceIndex].isUsed
        setGardenLayout(newGarden)
        if (newGarden[rowIndex][spaceIndex].isUsed) {
            document.getElementById(`${rowIndex}${spaceIndex}`).style.backgroundColor = 'green';
        } else {
            document.getElementById(`${rowIndex}${spaceIndex}`).style.backgroundColor = '#444';
        }
    }

    const renderSpaces = () => {
        return newGarden.map((row, rowIndex) => (
        <div className={`row`} key={rowIndex}>
            {row.map((space, spaceIndex) => (
            <div
                id={`${rowIndex}${spaceIndex}`}
                key={`${rowIndex}${spaceIndex}`}
                className={'setup-space'}
                onClick={() => handleClick(rowIndex, spaceIndex)}
            >
            </div>
            ))}
        </div>
        ));
    };

    return (
        <div className="garden-setup">
        {renderSpaces()}
        <button onClick={() => updateLayout(gardenLayout)}>Create</button>
        </div>
    )
}

export default GardenGrid;
