"use strict";

// Variables to hold JSON data
let projectData = null; // Holds data from projects.json

// Function to fetch project data from a JSON file
function fetchProjects() {
  fetch('data/projects.json')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      projectData = data;
      createProjectLinks();
    })
    .catch(error => {
      console.error('Fetch error for projects.json:', error);
    });
}

// Function to create project links and attach event listeners
function createProjectLinks() {
  const projectContainer = document.querySelector('.assignment-links ul');
  projectData.forEach(project => {
    const projectElement = projectContainer.querySelector(`[href="${project.link}"] .assignment-text`);
    projectElement.addEventListener('mouseover', () => displayProjectDescription(project.name, project.description));
    projectElement.addEventListener('mouseleave', hideProjectDescription);
  });
}

// Function to display project name and description on hover
function displayProjectDescription(name, description) {
  const infoDiv = document.querySelector('#project-info');
  infoDiv.innerHTML = `<h3>${name}</h3><p>${description}</p>`; // Set the inner HTML to include name and description
  infoDiv.style.display = 'block'; // Show the div
}

// Function to hide project description when not hovering
function hideProjectDescription() {
  const infoDiv = document.querySelector('#project-info');
  infoDiv.style.display = 'none'; // Hide the div
}

// Set up the initial UI once the DOM is fully loaded
document.addEventListener('DOMContentLoaded', fetchProjects);
