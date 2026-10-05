const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#main-navigation");
const year = document.querySelector("#current-year");


/* -----------------------------
   RESPONSIVE NAVIGATION
------------------------------ */

if (menuButton && navigation) {

    menuButton.addEventListener("click", () => {

        const isOpen = navigation.classList.toggle("open");

        menuButton.setAttribute(
            "aria-expanded",
            isOpen
        );

        menuButton.setAttribute(
            "aria-label",
            isOpen
                ? "Close navigation menu"
                : "Open navigation menu"
        );

    });

}


/* -----------------------------
   CURRENT YEAR
------------------------------ */

if (year) {

    year.textContent = new Date().getFullYear();

}


/* -----------------------------
   LOCAL STORAGE
------------------------------ */

const visitKey = "ginsoloVisitCount";

let visits =
    Number(localStorage.getItem(visitKey)) || 0;

visits++;

localStorage.setItem(
    visitKey,
    visits
);


/* -----------------------------
   FETCH FEATURED SERVICES
------------------------------ */

async function loadFeaturedServices() {

    const container =
        document.querySelector("#featured-services");

    if (!container) {
        return;
    }

    try {

        const response =
            await fetch("data/services.json");

        if (!response.ok) {

            throw new Error(
                `HTTP error: ${response.status}`
            );

        }

        const services =
            await response.json();


        const featured =
            services.slice(0, 6);


        container.innerHTML =
            featured.map(service => `

                <article class="service-card">

                    <p class="eyebrow">
                        ${service.category}
                    </p>

                    <h3>
                        ${service.name}
                    </h3>

                    <p>
                        ${service.description}
                    </p>

                    <div class="service-meta">

                        <span>
                            <strong>Material:</strong>
                            ${service.material}
                        </span>

                        <span>
                            <strong>Application:</strong>
                            ${service.application}
                        </span>

                        <span>
                            <strong>Capacity:</strong>
                            ${service.capacity}
                        </span>

                        <span>
                            <strong>Coverage:</strong>
                            ${service.coverage}
                        </span>

                    </div>

                </article>

            `).join("");


    } catch (error) {

        console.error(
            "Unable to load services:",
            error
        );

        container.innerHTML = `
            <p>
                Service information could not be loaded.
                Please try again later.
            </p>
        `;

    }

}


loadFeaturedServices();