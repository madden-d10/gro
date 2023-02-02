import React, { useState, useEffect } from 'react';
import '../styles/GardenSetup.css';

const newGarden = [
    [{id: '00', isUsed: false}, {id: '01', isUsed: false}, {id: '02', isUsed: false}, {id: '03', isUsed: false}, {id: '04', isUsed: false}, {id: '05', isUsed: false}, {id: '06', isUsed: false}, {id: '07', isUsed: false}, {id: '08', isUsed: false}, {id: '09', isUsed: false}],
    [{id: '10', isUsed: false}, {id: '11', isUsed: false}, {id: '12', isUsed: false}, {id: '13', isUsed: false}, {id: '14', isUsed: false}, {id: '15', isUsed: false}, {id: '16', isUsed: false}, {id: '17', isUsed: false}, {id: '18', isUsed: false}, {id: '19', isUsed: false}],
    [{id: '20', isUsed: false}, {id: '21', isUsed: false}, {id: '22', isUsed: false}, {id: '23', isUsed: false}, {id: '24', isUsed: false}, {id: '25', isUsed: false}, {id: '26', isUsed: false}, {id: '27', isUsed: false}, {id: '28', isUsed: false}, {id: '29', isUsed: false}],
    [{id: '30', isUsed: false}, {id: '31', isUsed: false}, {id: '32', isUsed: false}, {id: '33', isUsed: false}, {id: '34', isUsed: false}, {id: '35', isUsed: false}, {id: '36', isUsed: false}, {id: '37', isUsed: false}, {id: '38', isUsed: false}, {id: '39', isUsed: false}],
    [{id: '40', isUsed: false}, {id: '41', isUsed: false}, {id: '42', isUsed: false}, {id: '43', isUsed: false}, {id: '44', isUsed: false}, {id: '45', isUsed: false}, {id: '46', isUsed: false}, {id: '47', isUsed: false}, {id: '48', isUsed: false}, {id: '49', isUsed: false}],
    [{id: '50', isUsed: false}, {id: '51', isUsed: false}, {id: '52', isUsed: false}, {id: '53', isUsed: false}, {id: '54', isUsed: false}, {id: '55', isUsed: false}, {id: '56', isUsed: false}, {id: '57', isUsed: false}, {id: '58', isUsed: false}, {id: '59', isUsed: false}],
    [{id: '60', isUsed: false}, {id: '61', isUsed: false}, {id: '62', isUsed: false}, {id: '63', isUsed: false}, {id: '64', isUsed: false}, {id: '65', isUsed: false}, {id: '66', isUsed: false}, {id: '67', isUsed: false}, {id: '68', isUsed: false}, {id: '69', isUsed: false}],
    [{id: '70', isUsed: false}, {id: '71', isUsed: false}, {id: '72', isUsed: false}, {id: '73', isUsed: false}, {id: '74', isUsed: false}, {id: '75', isUsed: false}, {id: '76', isUsed: false}, {id: '77', isUsed: false}, {id: '78', isUsed: false}, {id: '79', isUsed: false}],
    [{id: '80', isUsed: false}, {id: '81', isUsed: false}, {id: '82', isUsed: false}, {id: '83', isUsed: false}, {id: '84', isUsed: false}, {id: '85', isUsed: false}, {id: '88', isUsed: false}, {id: '87', isUsed: false}, {id: '88', isUsed: false}, {id: '89', isUsed: false}],
    [{id: '90', isUsed: false}, {id: '91', isUsed: false}, {id: '92', isUsed: false}, {id: '93', isUsed: false}, {id: '94', isUsed: false}, {id: '95', isUsed: false}, {id: '96', isUsed: false}, {id: '97', isUsed: false}, {id: '98', isUsed: false}, {id: '99', isUsed: false}]
]

function GardenSetup() {
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
                        // set lowIndex to the currentIndex if:
                        // 1. there is already a lowIndex set from a previous row (isFirstUsedSpaceFound === true)
                        // 2. the current space is selected and has a lower index than the first space
                        lowIndex = currentIndex
                    }
                } else {
                    if (space.isUsed) {
                        // this sets the value of the lowIndex to the first space found
                        lowIndex = currentIndex
                        isFirstUsedSpaceFound = true
                    }
                }
                if (space.isUsed && currentIndex > highIndex) {
                    // the high index is simply set to the index of the used space that is the highest (e.g. the space furthest to the right)
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
                    // adds the index of each row being used
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

    const updateIDs = (newLayout) => {
        let rowIndex = 0;

        // because some rows have been deleted, the ids need to be reset to match the spaces posistion
        // This allows the drag and drop function to work later on
        for (let row of newLayout) {
            let spaceIndex = 0
            for (let space of row) {
                space.id = `${rowIndex}${spaceIndex}`
                spaceIndex++
            }
            rowIndex++
        }

        return newLayout
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

        // only adds all rows which contain spaces that are being used
        // it also ensures any rows between those rows are included
        newLayout = newLayout.splice(firstRowIndex, ((lastRowIndex - firstRowIndex) + 1));

        newLayout = updateIDs(newLayout)

        const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newLayout)
        };

        fetch('http://localhost:9000/gro/api/users/user2', requestOptions)
        .then(response => response.json())
        .then(window.location.reload())
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
                id={space.id}
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

export default GardenSetup;
