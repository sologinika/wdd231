const membersContainer =
    document.querySelector("#members");

const gridButton =
    document.querySelector("#grid-button");

const listButton =
    document.querySelector("#list-button");

const menuButton =
    document.querySelector("#menu-button");

const navMenu =
    document.querySelector("#nav-menu");


/* Mobile navigation */

menuButton.addEventListener("click", () => {

    navMenu.classList.toggle("open");

    const isOpen =
        navMenu.classList.contains("open");

    menuButton.setAttribute(
        "aria-expanded",
        isOpen
    );

});


/* Get membership level */

function getMembershipLevel(level) {

    if (level === 3) {
        return "Gold Member";
    }

    if (level === 2) {
        return "Silver Member";
    }

    return "Member";
}


/* Create member card */

function displayMembers(members) {

    membersContainer.innerHTML = "";

    members.forEach((member) => {

        const card =
            document.createElement("article");

        card.classList.add("member-card");

        card.innerHTML = `
            <img
                src="images/${member.image}"
                alt="${member.name} logo"
                loading="lazy"
            >

            <span class="member-level">
                ${getMembershipLevel(member.membership)}
            </span>

            <h2>${member.name}</h2>

            <p>
                <strong>Category:</strong>
                ${member.category}
            </p>

            <p>
                ${member.description}
            </p>

            <p>
                <strong>Address:</strong><br>
                ${member.address}
            </p>

            <p>
                <strong>Phone:</strong>
                ${member.phone}
            </p>

            <p>
                <a
                    href="${member.website}"
                    target="_blank"
                    rel="noopener"
                >
                    Visit Website
                </a>
            </p>
        `;

        membersContainer.appendChild(card);

    });
}


/* Fetch JSON data */

async function getMembers() {

    try {

        const response =
            await fetch("data/members.json");

        if (!response.ok) {
            throw new Error(
                `HTTP error: ${response.status}`
            );
        }

        const data =
            await response.json();

        displayMembers(data);

    } catch (error) {

        console.error(
            "Unable to load members:",
            error
        );

        membersContainer.innerHTML = `
            <p>
                Sorry, the member directory
                could not be loaded.
            </p>
        `;
    }
}


/* Grid view */

gridButton.addEventListener("click", () => {

    membersContainer.classList.remove("list-view");

    gridButton.classList.add("active");

    listButton.classList.remove("active");

});


/* List view */

listButton.addEventListener("click", () => {

    membersContainer.classList.add("list-view");

    listButton.classList.add("active");

    gridButton.classList.remove("active");

});


/* Copyright year */

document.querySelector("#current-year")
    .textContent = new Date().getFullYear();


/* Last modification */

document.querySelector("#last-modified")
    .textContent = document.lastModified;


/* Load members */

getMembers();