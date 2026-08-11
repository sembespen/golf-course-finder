import './style.css'

import { searchCourses } from './search.js'
import { renderCourses } from './render.js';
import { filterCourses } from './filter.js';
import { sortCourses } from './sort.js';

console.log("Golf Course Finder started");

const searchForm = document.querySelector("#course-search-form");
const searchInput = searchForm.querySelector("#course-search");
const searchStatus = document.querySelector("#search-status");
const searchStatusMessage = document.createElement("p");
const searchResults = document.querySelector("#course-results");

const countryPreference = document.querySelector('select[name="country-preference"]');
const holePreference = document.querySelectorAll('input[name="hole-preference"]');
const sortPreference = document.querySelector('select[name=sort-preference]');

let currentSearchResults = [];
let currentSearchQuery = "";

function updateResults() {
    searchResults.innerHTML = "";

    let courses = [...currentSearchResults]; // technically can do courses=currentSearchResults; no mutation will happen

    const currentHolePreference = document.querySelector('input[name="hole-preference"]:checked').value;

    courses = filterCourses(courses, countryPreference.value, currentHolePreference);

    courses = sortCourses(courses, sortPreference.value);

    if (courses.length === 0) {
        searchStatusMessage.textContent = `No courses found for "${currentSearchQuery}".`;

        return; 
    }
    
    searchStatusMessage.textContent = `${courses.length} course${courses.length === 1 ? "" : "s"} found for "${currentSearchQuery}".`

    renderCourses(searchResults, courses);
}

countryPreference.addEventListener("change", updateResults);

holePreference.forEach((element) => {
    element.addEventListener("change", updateResults);
});

sortPreference.addEventListener("change", updateResults);

searchForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    searchResults.innerHTML = "";

    searchStatusMessage.textContent = "Searching...";
    searchStatus.append(searchStatusMessage)

    currentSearchQuery = searchInput.value;

    try {
        currentSearchResults = await searchCourses(currentSearchQuery);

        updateResults();
    } catch(error) {
        searchStatusMessage.textContent = "Something went wrong. Please try again.";

        console.log(error.message);
    }
}); 