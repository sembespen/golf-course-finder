import './style.css'

import { searchCourses } from './search.js'

console.log("Golf Course Finder started");

const form = document.querySelector("#course-search-form");
const searchInput = form.querySelector("#course-search");
const searchStatus = document.querySelector("#search-status");
const searchStatusMessage = document.createElement("p");
const searchResults = document.querySelector("#course-results");

function renderCourses(courses) {
    searchResults.innerHTML = "";

    courses.forEach((course) => {
        const searchResultElement = document.createElement("li");

        const courseName = document.createElement("h3");
        const courseHoles = document.createElement("p");
        const coursePar = document.createElement("p");
        const courseLocation = document.createElement("p");

        courseName.textContent = course.name;
        courseHoles.textContent = `Holes: ${course.holes}`;
        coursePar.textContent = `Par: ${course.par}`;
        courseLocation.textContent = `${course.location}, ${course.country}`;

        searchResultElement.append(courseName, courseHoles, coursePar, courseLocation);

        searchResults.append(searchResultElement);
    });
}

form.addEventListener("submit", (event) => {
    event.preventDefault();

    searchResults.innerHTML = "";

    searchStatusMessage.textContent = "Searching...";
    searchStatus.append(searchStatusMessage)

    const searchInputValue = searchInput.value;

    setTimeout(() => {
        const courses = searchCourses(searchInputValue);

        if (courses.length === 0) {
            searchStatusMessage.textContent = `No courses found for "${searchInputValue}".`;

            return;
        } else {
            searchStatusMessage.textContent = `${courses.length} course${courses.length === 1 ? "" : "s"} found for "${searchInputValue}".`
        }

        renderCourses(courses);
        
    }, 1000);
}); 