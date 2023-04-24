import React, { useState } from "react";
import gardenersWorldLinks from "../gardenersWorldLinks";
import rhsGrowingGuideLinks from "../rhsGrowingGuideLinks";
import "../styles/Tips.css";

import PulseLoader from "react-spinners/PulseLoader";

let allLinks = [];

for (const link of gardenersWorldLinks ) {
  allLinks.push({website: 'GW', text: link})
}

for (const link of rhsGrowingGuideLinks ) {
  allLinks.push({website: 'RHS', text: link})
}

function Tips(props) {
  const [links, setLinks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [returnedInformation, setReturnedInformation] = useState([]);
  const [selectedInformation, setSelectedInformation] = useState([]);
  const [loading, setLoading] = useState(false)

  const getMatchingLinks = (value) => {
    const matchingLinks = []

    for (const link of allLinks) {
      const trimmedLink = link.text.replace("how-to/", "").replace("plants/", "")
        .replace("/growing-guide", "").replace("types/", "").replace("grow-plants/", "")
        .replaceAll("-", " ").replaceAll("/", " ")

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
        <span>(<i>{link.website}</i>)</span>
        <a href={link.text}>
          {link.text.replace("how-to/", "").replace("grow-plants/", "").replace("/growing-guide", "")
          .replace("plants/", "").replace("types/", "").replace("/", " ").replaceAll("-", " ")}
        </a>
        <button onClick={() => getFurtherInformation(link)}>Get Tips</button>
      </div>
    ));
  };

  const getFurtherInformation = (link) => {
    const endOfURL = encodeURIComponent(link.text);
    setReturnedInformation([])
    setLoading(true)
    setLinks([])

    fetch(`http://localhost:9000/gro/api/tips/${link.website}/${endOfURL}`)
    .then((res) => res.json())
    .then((res) => setReturnedInformation(res))
    .then(() => setLoading(false))
    .catch((err) => err);
  };

  const addSelectedInformation = () => {
    const userInfo = [];
    const username = sessionStorage.getItem('username')
    selectedInformation.forEach((item) => userInfo.push(item.info));

    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userInfo),
    };

    fetch(`http://localhost:9000/gro/api/users/${username}/${props.rowIndex}/${props.columnIndex}`, requestOptions)
    .then((response) => response.json());

    props.setUserNotes(userInfo)
    setReturnedInformation([])
    setSearchTerm('')
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
    const nthChild = index + 1
    const selectedElement = document.querySelector(`.returned-information:nth-child(${nthChild})`)

    if (!selectedElement.classList.contains("selected-information")) {
      selectedElement.classList.add("selected-information")
      setSelectedInformation([...selectedInformation, { index, info }]);
      return
    }

    setSelectedInformation(selectedInformation.filter(item => item.index !== index))
    selectedElement.classList.remove("selected-information")
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
      <h2>Find Tips</h2>
      <p>
        Data taken from <i>www.gardenersworld.com</i> and <i>www.rhs.org.uk</i>
      </p>
      <form className="searchForm">
        <input type={"text"} value={searchTerm} onChange={handleChange}></input>
      </form>
      <div className="search-results-container">{renderLinks()}</div>
      <br/>
      <PulseLoader
        color={"white"}
        loading={loading}
        size={20}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      {renderReturnedInformation()}
    </div>
  );
}

export default Tips;
