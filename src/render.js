export function renderCourses(searchResults, courses) {
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