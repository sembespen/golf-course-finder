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

let searchState = "initial";

let searchDebounceTimer;

let currentSearchResults = [];
let currentSearchQuery = "";
let currentSearchController;

function renderSearchState(resultCount = 0) {
    switch(searchState) {
        case "initial": 
            searchStatusMessage.textContent = "Search for a course to get started.";
            break;
        case "loading": 
            searchStatusMessage.textContent = "Searching...";
            break;
        case "error": 
            searchStatusMessage.textContent = "Something went wrong. Please try again.";
            break;
        case "empty": 
            searchStatusMessage.textContent = `No courses found for "${currentSearchQuery}".`;
            break;
        case "success": 
            searchStatusMessage.textContent = `${resultCount} course${resultCount === 1 ? "" : "s"} found for "${currentSearchQuery}".`;
            break;
        default: 
            console.warn(`Unknown search state: ${searchState}`);
    }
}

async function performSearch() {
    if (currentSearchController != null) {
        currentSearchController.abort();
    }

    const queryForThisSearch = searchInput.value;

    searchState = "loading";
    renderSearchState();
    
    try {
        currentSearchController = new AbortController();
        const results = await searchCourses(queryForThisSearch, currentSearchController.signal);

        if (queryForThisSearch !== searchInput.value) { // stale-response check, less important with the existence of AbortController
            return;
        }

        currentSearchQuery = queryForThisSearch;
        currentSearchResults = results;

        updateResults();
    } catch(error) {
        if (error.name === "AbortError") {
            return;
        }
        searchState = "error";
        renderSearchState();

        console.log(error.message);
    }
}

function updateResults() {
    searchResults.innerHTML = "";

    let courses = [...currentSearchResults]; // technically can do courses=currentSearchResults; no mutation will happen

    const currentHolePreference = document.querySelector('input[name="hole-preference"]:checked').value;

    courses = filterCourses(courses, countryPreference.value, currentHolePreference);

    courses = sortCourses(courses, sortPreference.value);

    if (courses.length === 0) {
        searchState = "empty";
        renderSearchState();

        return; 
    }
    
    searchState = "success";
    renderSearchState(courses.length);
    renderCourses(searchResults, courses);
    currentSearchController = null;
}

searchInput.addEventListener("input", () => {
    clearTimeout(searchDebounceTimer);

    searchDebounceTimer = setTimeout(() => {
        performSearch();
    }, 400);
});

searchForm.addEventListener("submit", (event) => {
    event.preventDefault();

    clearTimeout(searchDebounceTimer);
    performSearch();
}); 

countryPreference.addEventListener("change", updateResults);

holePreference.forEach((element) => {
    element.addEventListener("change", updateResults);
});

sortPreference.addEventListener("change", updateResults);

searchStatus.append(searchStatusMessage);
renderSearchState();