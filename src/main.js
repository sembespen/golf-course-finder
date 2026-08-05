import './style.css'

console.log("Golf Course Finder started");

const form = document.querySelector("#course-search-form");
const searchStatus = document.querySelector("#search-status");
let searchStatusMessage = document.createElement("p");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const input = form.querySelector("#course-search");

    searchStatusMessage.innerHTML = "Searching...";
    searchStatus.append(searchStatusMessage)

    setTimeout(() => {
        searchStatusMessage.innerHTML = "You searched for '" + input.value + "'";
    }, 1000);
});