import React, { useState, useEffect } from 'react';

function Information (){
    const [plantInfo, setPlantInfo] = useState({ apiResponse: "" });
        
    useEffect(() => {
        fetch("http://localhost:9000/gro/plants")
        .then(res => res.text())
        .then(res => setPlantInfo({ apiResponse: res }))
        .catch(err => err);
    }, [])

    return (
        <div id='information-wrapper'>
            <h1>Information page</h1>
        </div>
    );
}
  
export default Information;