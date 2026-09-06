const courses = [
    {
        subject: "WDD",
        number: 130,
        title: "Web Fundamentals",
        credits: 3,
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
        credits: 3,
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
        completed: false
    },

    {
        subject: "CSE",
        number: 210,
        title: "Programming with Classes",
        credits: 3,
        completed: false
    }
];

const courseContainer =
    document.querySelector("#courseContainer");

const totalCredits =
    document.querySelector("#totalCredits");


const allCoursesButton =
    document.querySelector("#allCourses");

const wddCoursesButton =
    document.querySelector("#wddCourses");

const cseCoursesButton =
    document.querySelector("#cseCourses");


// =========================
// DISPLAY COURSES
// =========================

function displayCourses(courseList) {

    courseContainer.innerHTML = "";

    courseList.forEach(course => {

        const card = document.createElement("article");

        card.classList.add("course-card");


        if (course.completed) {

            card.classList.add("completed");

        }


        card.innerHTML = `
            <h3>
                ${course.subject} ${course.number}
            </h3>

            <p>
                ${course.title}
            </p>

            <p>
                Credits: ${course.credits}
            </p>

            ${
                course.completed
                    ? `<p class="completed-label">
                         ✓ Completed
                       </p>`
                    : `<p>
                         Not Completed
                       </p>`
            }
        `;


        courseContainer.appendChild(card);

    });


    calculateCredits(courseList);

}


// =========================
// REDUCE
// =========================

function calculateCredits(courseList) {

    const credits = courseList.reduce(
        (total, course) =>
            total + course.credits,
        0
    );

    totalCredits.textContent = credits;
}


// =========================
// ALL
// =========================

allCoursesButton.addEventListener(
    "click",
    () => {

        displayCourses(courses);

        setActiveButton(allCoursesButton);

    }
);


// =========================
// WDD
// =========================

wddCoursesButton.addEventListener(
    "click",
    () => {

        const wddCourses =
            courses.filter(
                course =>
                    course.subject === "WDD"
            );

        displayCourses(wddCourses);

        setActiveButton(wddCoursesButton);

    }
);


// =========================
// CSE
// =========================

cseCoursesButton.addEventListener(
    "click",
    () => {

        const cseCourses =
            courses.filter(
                course =>
                    course.subject === "CSE"
            );

        displayCourses(cseCourses);

        setActiveButton(cseCoursesButton);

    }
);


// =========================
// ACTIVE BUTTON
// =========================

function setActiveButton(activeButton) {

    document
        .querySelectorAll(
            ".course-buttons button"
        )
        .forEach(button => {

            button.classList.remove("active");

        });


    activeButton.classList.add("active");
}


// =========================
// INITIAL DISPLAY
// =========================

displayCourses(courses);

setActiveButton(allCoursesButton);