function filterCourses(courses, countryPreference, holePreference) {
    const normalizedHoles = holePreference === "all" ? "all" : Number(holePreference);

    return courses.filter((course) => {
        const matchesCountry = countryPreference === "all" || course.country.toLowerCase() === countryPreference;

        const matchesHoles = normalizedHoles === "all" || course.holes === normalizedHoles;

        return matchesCountry && matchesHoles;
    });
}

export { filterCourses };