import React, { useState, useEffect } from 'react';
import GardenGrid from './GardenGrid';
  
function GardenLayout (){

    return (
        <div id = 'gardenLayout-wrapper'>
            <h1>Garden Layout</h1>
            <GardenGrid />
        </div>
    )
}
  
export default GardenLayout;