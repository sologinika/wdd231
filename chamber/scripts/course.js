// ===============================
// COURSE DATA
// ===============================

const courses = [

    {
        subject: "WDD",
        number: 130,
        title: "Web Fundamentals",
        credits: 2,
        completed: true
    },

    {
        subject: "WDD",
        number: 131,
        title: "Dynamic Web Fundamentals",
        credits: 2,
        completed: true
    },

    {
        subject: "WDD",
        number: 231,
        title: "Web Frontend Development I",
        credits: 2,
        completed: false
    },

    {
        subject: "CSE",
        number: 110,
        title: "Introduction to Programming",
        credits: 2,
        completed: true
    },

    {
        subject: "CSE",
        number: 111,
        title: "Programming with Functions",
        credits: 2,
        completed: true
    },

    {
        subject: "CSE",
        number: 210,
        title: "Programming with Classes",
        credits: 2,
        completed: false
    }

];


// ===============================
// SELECT HTML ELEMENTS
// ===============================

const courseContainer =
    document.querySelector("#course-container");

const totalCredits =
    document.querySelector("#total-credits");

const filterButtons =
    document.querySelectorAll(".filter-btn");


// ===============================
// DISPLAY COURSES
// ===============================

function displayCourses(courseList) {

    courseContainer.innerHTML = "";

    courseList.forEach(course => {

        const courseCard = document.createElement("article");

        courseCard.classList.add("course-card");

        if (course.completed) {

            courseCard.classList.add("completed");

        }

        courseCard.innerHTML = `

            <h3>${course.subject} ${course.number}</h3>

            <p>${course.title}</p>

            <p>
                <strong>Credits:</strong>
                ${course.credits}
            </p>

            ${course.completed
                ? '<span class="completed-label">✓ Completed</span>'
                : '<span>Not Yet Completed</span>'
            }

        `;

        courseContainer.appendChild(courseCard);

    });

}


// ===============================
// CALCULATE TOTAL CREDITS
// USING REDUCE()
// ===============================

function calculateCredits(courseList) {

    const credits = courseList.reduce(
        (total, course) => total + course.credits,
        0
    );

    totalCredits.textContent = credits;

}


// ===============================
// FILTER COURSES
// ===============================

function filterCourses(subject) {

    let filteredCourses;

    if (subject === "ALL") {

        filteredCourses = courses;

    } else {

        filteredCourses = courses.filter(
            course => course.subject === subject
        );

    }

    displayCourses(filteredCourses);

    calculateCredits(filteredCourses);

}


// ===============================
// FILTER BUTTON EVENTS
// ===============================

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        const selectedFilter = button.dataset.filter;

        // Remove active state from all buttons

        filterButtons.forEach(btn => {

            btn.classList.remove("active");

            btn.setAttribute("aria-pressed", "false");

        });


        // Activate selected button

        button.classList.add("active");

        button.setAttribute("aria-pressed", "true");


        // Display filtered courses

        filterCourses(selectedFilter);

    });

});


// ===============================
// INITIAL DISPLAY
// ===============================

filterCourses("ALL");