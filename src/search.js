async function searchCourses(query) {
    const normalizedQuery = query.trim().toLowerCase();

    if (normalizedQuery === "") {
        return [];
    }

    const response = await fetch("/courses.json");

    if (!response.ok) {
        throw new Error(`Failed to load course data: HTTP ${response.status}`);
    }

    const courses = await response.json();

    const matchingCourses = courses.filter((course) => {
        return (
            course.name.toLowerCase().includes(normalizedQuery) ||
            course.country.toLowerCase().includes(normalizedQuery) ||
            course.location.toLowerCase().includes(normalizedQuery)
        );
    });

    return matchingCourses;
}

export { searchCourses };