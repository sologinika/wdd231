import "./main.js";


const container =
    document.querySelector("#services-container");

const filter =
    document.querySelector("#service-filter");

const modal =
    document.querySelector("#service-modal");

const modalBody =
    document.querySelector("#modal-body");

const modalClose =
    document.querySelector("#modal-close");


let allServices = [];


/* -----------------------------
   FETCH DATA
------------------------------ */

async function getServices() {

    try {

        const response =
            await fetch("data/services.json");

        if (!response.ok) {

            throw new Error(
                `Unable to fetch services: ${response.status}`
            );

        }

        allServices =
            await response.json();


        displayServices(allServices);


        /*
         * Save the number of available
         * services using localStorage.
         */
        localStorage.setItem(
            "ginsoloServiceCount",
            allServices.length
        );


    } catch (error) {

        console.error(
            "Service loading error:",
            error
        );

        container.innerHTML = `
            <p>
                We were unable to load the services.
                Please refresh the page and try again.
            </p>
        `;

    }

}


/* -----------------------------
   DISPLAY SERVICES
------------------------------ */

function displayServices(services) {

    if (services.length === 0) {

        container.innerHTML = `
            <p>
                No services match your selection.
            </p>
        `;

        return;
    }


    container.innerHTML =
        services.map(service => `

            <article class="service-card">

                <p class="eyebrow">
                    ${service.category}
                </p>

                <h2>
                    ${service.name}
                </h2>

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


                <button
                    class="button primary-button service-button"
                    data-id="${service.id}"
                >
                    View Details
                </button>

            </article>

        `).join("");


    attachServiceButtons();

}


/* -----------------------------
   MODAL
------------------------------ */

function attachServiceButtons() {

    const buttons =
        document.querySelectorAll(
            ".service-button"
        );


    buttons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const id =
                    Number(button.dataset.id);

                const service =
                    allServices.find(
                        item => item.id === id
                    );


                if (!service) {
                    return;
                }


                modalBody.innerHTML = `

                    <p class="eyebrow">
                        ${service.category}
                    </p>

                    <h2>
                        ${service.name}
                    </h2>

                    <p>
                        ${service.description}
                    </p>

                    <dl>

                        <dt><strong>Material</strong></dt>
                        <dd>${service.material}</dd>

                        <dt><strong>Application</strong></dt>
                        <dd>${service.application}</dd>

                        <dt><strong>Capacity</strong></dt>
                        <dd>${service.capacity}</dd>

                        <dt><strong>Coverage</strong></dt>
                        <dd>${service.coverage}</dd>

                    </dl>

                    <br>

                    <a
                        class="button primary-button"
                        href="contact.html"
                    >
                        Request This Service
                    </a>

                `;


                modal.showModal();

            }
        );

    });

}


/* -----------------------------
   CLOSE MODAL
------------------------------ */

modalClose.addEventListener(
    "click",
    () => modal.close()
);


modal.addEventListener(
    "click",
    event => {

        if (event.target === modal) {
            modal.close();
        }

    }
);


/* -----------------------------
   FILTER
------------------------------ */

filter.addEventListener(
    "change",
    event => {

        const selected =
            event.target.value;


        if (selected === "all") {

            displayServices(allServices);

            return;
        }


        const filtered =
            allServices.filter(
                service =>
                    service.category === selected
            );


        displayServices(filtered);

    }
);


/* -----------------------------
   START
------------------------------ */

getServices();