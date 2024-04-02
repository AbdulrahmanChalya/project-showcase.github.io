"use strict";

// Variables to hold JSON data
let planetData = null; // Holds data from planets.json
let labelData = null; // Holds data from labels.json

// Fetch labels.json and save it to the labelData variable
function fetchLabels() {
  fetch('data/labels.json')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log(data); 
      labelData = data;
    })
    .catch(error => {
      console.error('Fetch error for labels.json:', error);
    });
}

// Fetch planets.json and save it to the planetData variable
function fetchPlanets() {
  fetch('data/planets.json')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      planetData = data;
      createPlanetNavigation();
    })
    .catch(error => {
      console.error('Fetch error for planets.json:', error);
    });
}

// Create planet navigation buttons and attach event listeners
function createPlanetNavigation() {
  const navigationElement = document.querySelector('nav');
  planetData.forEach(planet => {
    const planetButton = document.createElement('button');
    planetButton.textContent = planet.name;
    planetButton.addEventListener('mouseover', displayPlanetInformation);
    planetButton.addEventListener('click', displayPlanetInformation);
    navigationElement.appendChild(planetButton);
  });
}

// Event handler to display planet information when a button is clicked or hovered
function displayPlanetInformation(event) {
  const selectedPlanetName = event.target.textContent;
  const selectedPlanet = planetData.find(planet => planet.name === selectedPlanetName);
  if (!selectedPlanet) return;

  const informationDiv = document.querySelector('section:nth-child(2) > div');
  informationDiv.replaceChildren(); // Clear existing children

  Object.entries(labelData).forEach(([key, label]) => {
    const labelSpan = document.createElement('span');
    labelSpan.className = 'label';
    labelSpan.textContent = label;

    const valueSpan = document.createElement('span');
    if (key === 'url') {
      const linkElement = document.createElement('a');
      linkElement.href = selectedPlanet[key];
      linkElement.textContent = selectedPlanet[key];
      valueSpan.appendChild(linkElement);
    } else {
      valueSpan.textContent = selectedPlanet[key].toLocaleString();
    }

    const detailDiv = document.createElement('div');
    detailDiv.appendChild(labelSpan);
    detailDiv.appendChild(valueSpan);
    informationDiv.appendChild(detailDiv);
  });

  const planetImage = document.createElement('img');
  planetImage.src = `images/${selectedPlanet.img}`;
  planetImage.alt = `Picture of ${selectedPlanet.name}`;  
  informationDiv.appendChild(planetImage);
}

// Set up the initial UI once the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  fetchLabels();
  fetchPlanets();
});
