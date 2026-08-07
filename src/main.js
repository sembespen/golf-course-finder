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

searchForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    searchResults.innerHTML = "";

    searchStatusMessage.textContent = "Searching...";
    searchStatus.append(searchStatusMessage)

    const searchInputValue = searchInput.value;

    try {
        let courses = await searchCourses(searchInputValue);

        const countryPreference = document.querySelector('select[name="country-preference"]').value;
        const holePreference = document.querySelector('input[name="hole-preference"]:checked').value;
        courses = filterCourses(courses, countryPreference, holePreference);

        const sortPreference = document.querySelector('select[name=sort-preference]').value;
        courses = sortCourses(courses, sortPreference);

        if (courses.length === 0) {
            searchStatusMessage.textContent = `No courses found for "${searchInputValue}".`;

            return; 
        }
        
        searchStatusMessage.textContent = `${courses.length} course${courses.length === 1 ? "" : "s"} found for "${searchInputValue}".`

        renderCourses(searchResults, courses);
    } catch(error) {
        searchStatusMessage.textContent = "Something went wrong. Please try again.";

        console.log(error.message);
    }
}); 