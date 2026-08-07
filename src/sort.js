function sortCourses(courses, sortPreference) {
    const sortedCourses = [...courses];

    if (sortPreference === "alphabetical") {
        sortedCourses.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortPreference === "reverse-alphabetical") {
        sortedCourses.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortPreference === "holes-ascending") {
        sortedCourses.sort((a, b) => a.holes - b.holes);
    } else if (sortPreference === "holes-descending") {
        sortedCourses.sort((a, b) => b.holes - a.holes);
    }

    return sortedCourses;
}

export { sortCourses };