import React, { useState } from "react";
import gardenersWorldLinks from "../gardenersWorldLinks";
import "../styles/Information.css";

function Information(props) {
  const [links, setLinks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [returnedInformation, setReturnedInformation] = useState([]);
  const [selectedInformation, setSelectedInformation] = useState([]);


  const getMatchingLinks = (value) => {
    const matchingLinks = []

    for (const link of gardenersWorldLinks) {
      const trimmedLink = link.replace("how-to/", "").replace("grow-plants/", "").replace("/", "").replaceAll("-", " ")
      if (trimmedLink.includes(`${value.toLowerCase()}`)) {
        matchingLinks.push(link)
      }
    }

    return matchingLinks
  }

  const handleChange = (event) => {
    const { value } = event.target;
    setSearchTerm(value);

    if (value.length === 0) {
      return setLinks([]);
    }

    const matchingLinks = getMatchingLinks(value)
    setLinks(matchingLinks);
  };

  const renderLinks = () => {
    return links.map((link, index) => (
      <div key={index} className="search-result">
        <a href={link}>
          {link.replace("how-to/", "").replace("grow-plants/", "").replace("/", "").replaceAll("-", " ")}
        </a>
        <button onClick={() => getFurtherInformation(link)}>Get Tips</button>
      </div>
    ));
  };

  const getFurtherInformation = (link) => {
    const endOfURL = encodeURIComponent(link);

    fetch(`http://localhost:9000/gro/api/tip/${endOfURL}`)
      .then((res) => res.json())
      .then((res) => setReturnedInformation(res))
      .catch((err) => err);
  };

  const addSelectedInformation = () => {
    const userInfo = [];
    selectedInformation.forEach((item) => userInfo.push(item.info));

    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userInfo),
    };

    fetch(`http://localhost:9000/gro/api/users/user2/${props.rowIndex}/${props.spaceIndex}`, requestOptions)
    .then((response) => response.json());
  };

  const renderReturnedInformation = () => {
    if (returnedInformation.length > 0) {
      return (
        <div className="returned-information-container">
          {renderReturnedInformationList()}
          <button onClick={addSelectedInformation}>Add Selected</button>
        </div>
      );
    }
  };

  const handleInformationClick = (index, info) => {
    setSelectedInformation([...selectedInformation, { index, info }]);
  };

  const renderReturnedInformationList = () => {
    return returnedInformation.map((info, index) => (
      <p
        className="returned-information"
        key={index}
        onClick={() => handleInformationClick(index, info)}
      >
        {info}
      </p>
    ));
  };

  return (
    <div id="information-wrapper">
      <h2>Find further Information</h2>
      <p>
        <i>Data taken from www.gardenersworld.com</i>
      </p>
      <form className="searchForm">
        <input type={"text"} value={searchTerm} onChange={handleChange}></input>
      </form>
      {renderReturnedInformation()}
      <div className="search-results-container">{renderLinks()}</div>
    </div>
  );
}

export default Information;
