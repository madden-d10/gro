import React, { useState, useEffect } from 'react';
import '../styles/GardenGrid.css';

const newGarden = [
    [{id: '00'}, {id: '01'}, {id: '02'}, {id: '03'}, {id: '04'}, {id: '05'}, {id: '06'}, {id: '07'}],
    [{id: '10'}, {id: '11'}, {id: '12'}, {id: '13'}, {id: '14'}, {id: '15'}, {id: '16'}, {id: '17'}],
    [{id: '20'}, {id: '21'}, {id: '22'}, {id: '23'}, {id: '24'}, {id: '25'}, {id: '26'}, {id: '27'}],
    [{id: '30'}, {id: '31'}, {id: '32'}, {id: '33'}, {id: '34'}, {id: '35'}, {id: '36'}, {id: '37'}],
    [{id: '40'}, {id: '41'}, {id: '42'}, {id: '43'}, {id: '44'}, {id: '45'}, {id: '46'}, {id: '47'}],
    [{id: '50'}, {id: '51'}, {id: '52'}, {id: '53'}, {id: '54'}, {id: '55'}, {id: '56'}, {id: '57'}],
    [{id: '60'}, {id: '61'}, {id: '62'}, {id: '63'}, {id: '64'}, {id: '65'}, {id: '66'}, {id: '67'}],
    [{id: '70'}, {id: '71'}, {id: '72'}, {id: '73'}, {id: '74'}, {id: '75'}, {id: '76'}, {id: '77'}]
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

  const updateLayout = (newLayout) => {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newLayout)
    };

    fetch('http://localhost:9000/gro/api/users/user2', requestOptions)
      .then(response => response.json())
  }

    const handleClick = (rowIndex, spaceIndex) => {
        newGarden[rowIndex][spaceIndex].isUsed = true
        setGardenLayout(newGarden)
        console.log(newGarden)
    }

    const renderSpaces = () => {
        return newGarden.map((row, rowIndex) => (
        <div className={`row`} key={rowIndex}>
            {row.map((space, spaceIndex) => (
            <div
                id={`${rowIndex}${spaceIndex}`}
                key={`${rowIndex}${spaceIndex}`}
                onClick={() => handleClick(rowIndex, spaceIndex)}
            >
            X
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
