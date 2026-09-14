const menuButton = document.querySelector("#menu-button");
const navMenu = document.querySelector("#nav-menu");

menuButton.addEventListener("click", () => {

    const isOpen = navMenu.classList.toggle("open");

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


/* =================================
   FOOTER
================================ */

document.querySelector("#current-year").textContent =
    new Date().getFullYear();

document.querySelector("#last-modified").textContent =
    document.lastModified;


/* =================================
   OPENWEATHERMAP
================================ */

/*
    Replace YOUR_API_KEY with your
    actual OpenWeatherMap API key.
*/

const API_KEY = "YOUR_API_KEY";

const LATITUDE = 5.5320;
const LONGITUDE = 7.4860;

const weatherURL =
    `https://api.openweathermap.org/data/2.5/forecast?lat=${LATITUDE}&lon=${LONGITUDE}&units=metric&appid=${API_KEY}`;


async function getWeather() {

    try {

        const response = await fetch(weatherURL);

        if (!response.ok) {
            throw new Error("Weather data could not be loaded.");
        }

        const data = await response.json();

        displayCurrentWeather(data);

        displayForecast(data);

    } catch (error) {

        console.error(error);

        document.querySelector("#current-weather").innerHTML =
            "<p>Weather information is currently unavailable.</p>";

        document.querySelector("#forecast").innerHTML =
            "<p>Forecast information is currently unavailable.</p>";
    }
}


function displayCurrentWeather(data) {

    const current = data.list[0];

    const temperature =
        Math.round(current.main.temp);

    const description =
        current.weather[0].description;

    const icon =
        current.weather[0].icon;

    document.querySelector("#current-weather").innerHTML = `

        <img
            src="https://openweathermap.org/img/wn/${icon}@2x.png"
            alt="${description}"
            width="100"
            height="100">

        <p class="temperature">
            <strong>${temperature}°C</strong>
        </p>

        <p>
            ${description}
        </p>

        <p>
            Feels like ${Math.round(current.main.feels_like)}°C
        </p>

    `;
}


function displayForecast(data) {

    const forecastContainer =
        document.querySelector("#forecast");

    forecastContainer.innerHTML = "";

    const dailyForecasts = [];

    for (const item of data.list) {

        const date = new Date(item.dt * 1000);

        const dateString =
            date.toISOString().split("T")[0];

        if (
            !dailyForecasts.some(
                item => item.date === dateString
            )
        ) {

            dailyForecasts.push({
                date: dateString,
                temperature: Math.round(item.main.temp),
                description: item.weather[0].description
            });

        }

        if (dailyForecasts.length === 3) {
            break;
        }
    }


    dailyForecasts.forEach(day => {

        const date =
            new Date(`${day.date}T12:00:00`);

        const card =
            document.createElement("article");

        card.classList.add("forecast-card");

        card.innerHTML = `

            <h4>
                ${date.toLocaleDateString(
                    "en-US",
                    { weekday: "long" }
                )}
            </h4>

            <p>
                <strong>
                    ${day.temperature}°C
                </strong>
            </p>

            <p>
                ${day.description}
            </p>

        `;

        forecastContainer.appendChild(card);

    });

}


/* =================================
   MEMBER SPOTLIGHTS
================================ */

async function getMembers() {

    try {

        const response =
            await fetch("data/members.json");

        if (!response.ok) {
            throw new Error(
                "Member data could not be loaded."
            );
        }

        const members =
            await response.json();

        displaySpotlights(members);

    } catch (error) {

        console.error(error);

        document.querySelector("#spotlights").innerHTML =
            "<p>Business spotlights are currently unavailable.</p>";
    }
}


function displaySpotlights(members) {

    const spotlightContainer =
        document.querySelector("#spotlights");

    spotlightContainer.innerHTML = "";


    const qualifiedMembers =
        members.filter(member =>
            member.membership_level === "Gold" ||
            member.membership_level === "Silver"
        );


    const shuffled =
        [...qualifiedMembers].sort(
            () => Math.random() - 0.5
        );


    const selectedMembers =
        shuffled.slice(0, 3);


    selectedMembers.forEach(member => {

        const card =
            document.createElement("article");

        card.classList.add("spotlight-card");

        card.innerHTML = `

            <img
                src="images/${member.image}"
                alt="${member.name} logo"
                width="120"
                height="80"
                loading="lazy">

            <h3>
                ${member.name}
            </h3>

            <p>
                <strong>Membership:</strong>
                ${member.membership_level}
            </p>

            <p>
                ${member.address}
            </p>

            <p>
                ${member.phone}
            </p>

            <p>
                <a
                    href="${member.website}"
                    target="_blank"
                    rel="noopener noreferrer">
                    Visit Website
                </a>
            </p>

        `;

        spotlightContainer.appendChild(card);

    });

}


/* =================================
   START APPLICATION
================================ */

getWeather();
getMembers();