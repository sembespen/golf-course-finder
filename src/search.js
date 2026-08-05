const courses = [
    {
        name: "Drøbak Golfklubb",
        holes: 18,
        par: 72,
        country: "Norway",
        location: "Drøbak"
    },
    {
        name: "Soon Golfklubb",
        holes: 9,
        par: 35,
        country: "Norway",
        location: "Son"
    }
]

function searchCourses(query) {
    const normalizedQuery = query.trim().toLowerCase();

    if (normalizedQuery === "") {
        return [];
    }

    return courses.filter((course) => {
        return (
            course.name.toLowerCase().includes(normalizedQuery) ||
            course.country.toLowerCase().includes(normalizedQuery) ||
            course.location.toLowerCase().includes(normalizedQuery)
        );
    });
}

export { searchCourses };