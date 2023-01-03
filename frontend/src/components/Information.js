import React, { useState, useEffect } from 'react';
import gardenersWorldLinksArray from '../gardenersWorldLinks'
import '../styles/Information.css'

function Information (){
    const [links, setLinks] = useState([])
    const [searchTerm, setSearchTerm] = useState("");

    const handleChange = (event) => {
        setSearchTerm(event.target.value)
        const applicableResults = gardenersWorldLinksArray.filter((link) => {
            return link.includes(`${event.target.value.toLowerCase()}`)
        })
        setLinks(applicableResults)
    }

    // const capitalizeWord = (word) => {
    //       const firstLetter = word.charAt(0).toUpperCase();
    //       const rest = word.slice(1).toLowerCase();
      
    //       return firstLetter + rest;
    //   }

    // const formatLink = (link) => {
    //     const x = link.replace('https://www.gardenersworld.com/how-to/grow-plants/', '')
    //     .replace('/', '')
    //     .replace('-', ' ')

    //     const capitalizedWord = capitalizeWord(x)

    //     return capitalizedWord
    // }

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
            </div>
        ))
    }

    return (
        <div id='information-wrapper'>
            <h1>Information page</h1>
            <p><i>Data taken from www.gardenersworld.com</i></p>
            <form className='searchForm'>
                <input type={'text'} value={searchTerm} onChange={handleChange}></input>
            </form>
            <div className='search-results-container'>
                {renderLinks()}
            </div>
        </div>
    );
}
  
export default Information;