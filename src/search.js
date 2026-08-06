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

    return new Promise((resolve, reject) => {
        setTimeout(() => {

            if (normalizedQuery === "error") {
                reject(new Error("Simulated error."));
                return;
            }

            if (normalizedQuery === "") {
                resolve([]);
                return;
            }

            const matchingCourses = courses.filter((course) => {
                return (
                    course.name.toLowerCase().includes(normalizedQuery) ||
                    course.country.toLowerCase().includes(normalizedQuery) ||
                    course.location.toLowerCase().includes(normalizedQuery)
                );
            });

            resolve(matchingCourses);
        }, 1000);
    });
}

export { searchCourses };