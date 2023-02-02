import React, { useState, useEffect } from 'react';
import gardenersWorldLinksArray from '../gardenersWorldLinks'
import '../styles/Information.css'

function Information (props){
    const [links, setLinks] = useState([])
    const [searchTerm, setSearchTerm] = useState("");
    const [returnedInformation, setReturnedInformation] = useState([])
    const [selectedInformation, setSelectedInformation] = useState([])

    const handleChange = (event) => {
        setSearchTerm(event.target.value)
        if (event.target.value.length === 0) {
            setLinks([])
            return
        }

        const applicableResults = gardenersWorldLinksArray.filter((link) => {
            return link.includes(`${event.target.value.toLowerCase()}`)
        })
        setLinks(applicableResults)
    }

    const renderLinks = () => {
        return links.map((link, index) => (
            <div key={index} className='search-result'>
                <a href={link}>
                {link.replace('https://www.gardenersworld.com/how-to/grow-plants/', '')
                    .replace('https://www.gardenersworld.com/grow-plants/', '')
                    .replace('https://www.gardenersworld.com/how-to/', '')
                    .replace('/', '')
                    .replaceAll('-', ' ')}
                </a>
                <button onClick={() => getFurtherInformation(link.replace('https://www.gardenersworld.com/', '').replaceAll('/', '_'))}>Get Tips</button>
            </div>
        ))
    }

    const getFurtherInformation = (endOfURL) => {
        fetch(`http://localhost:9000/gro/api/tip/${endOfURL}`)
        .then(res => res.json())
        .then(res => setReturnedInformation(res))
        .then(res => console.log(res))
        .catch(err => err);
    }

    const addSelectedInformation = () => {
        const userInfo = []
        selectedInformation.forEach(item => userInfo.push(item.info))
        console.log(userInfo)

        // const requestOptions = {
        //     method: 'PUT',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(userInfo)
        // };

        // fetch(`http://localhost:9000/gro/api/plants/${}`, requestOptions)
        // .then(response => response.json())
    }

    const renderReturnedInformation = () => {
        if (returnedInformation.length > 0) {
            return (
                <div className='returned-information-container'>
                    {renderReturnedInformationList()}
                    <button onClick={addSelectedInformation}>Add Selected</button>
                </div>
            )
        }
    }
    
    const handleInformationClick = (index, info) => {
        setSelectedInformation([...selectedInformation, {index, info}]) 
        console.log(selectedInformation)
    }

    const renderReturnedInformationList = () => {
        return returnedInformation.map((info, index) => (
            <p className='returned-information' key={index} onClick={() => handleInformationClick(index, info)}>{info}</p>
        ))
    }

    return (
        <div id='information-wrapper'>
            <h1>Find further Information</h1>
            <p><i>Data taken from www.gardenersworld.com</i></p>
            <form className='searchForm'>
                <input type={'text'} value={searchTerm} onChange={handleChange}></input>
            </form>
            {renderReturnedInformation()}
            <div className='search-results-container'>
                {renderLinks()}
            </div>
        </div>
    );
}
  
export default Information;