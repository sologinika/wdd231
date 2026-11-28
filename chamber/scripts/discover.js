import { attractions } from "../data/discover.mjs";

const grid = document.querySelector("#attractions-grid");
const visitMessage = document.querySelector("#visit-message");
const dialog = document.querySelector("#attraction-dialog");
const dialogTitle = document.querySelector("#dialog-title");
const dialogDescription = document.querySelector("#dialog-description");
const dialogAddress = document.querySelector("#dialog-address");
const dialogClose = document.querySelector("#dialog-close");

// Render the visit message before saving the current visit time.
function displayVisitMessage() {
  const storageKey = "abiaDiscoverLastVisit";
  const now = Date.now();
  const previousVisit = Number(localStorage.getItem(storageKey));

  let message = "Welcome! Let us know if you have any questions.";

  if (previousVisit) {
    const elapsedMilliseconds = now - previousVisit;
    const oneDay = 24 * 60 * 60 * 1000;

    if (elapsedMilliseconds < oneDay) {
      message = "Back so soon! Awesome!";
    } else {
      const days = Math.floor(elapsedMilliseconds / oneDay);
      const unit = days === 1 ? "day" : "days";
      message = `You last visited ${days} ${unit} ago.`;
    }
  }

  visitMessage.innerHTML = `<p>${message}</p>`;
  localStorage.setItem(storageKey, String(now));
}

function renderAttractions(items) {
  // array.forEach() and template literals are used to build the cards from module data.
  grid.innerHTML = items.map((place) => `
    <article class="attraction-card" data-area="${place.id}">
      <h2>${place.name}</h2>
      <figure>
        <img src="${place.image}" alt="${place.imageAlt}" width="300" height="200" loading="lazy">
        <figcaption>${place.category}</figcaption>
      </figure>
      <address>${place.address}</address>
      <p>${place.description}</p>
      <button class="learn-more" type="button" data-place-id="${place.id}">Learn More</button>
    </article>
  `).join("");

  grid.querySelectorAll(".learn-more").forEach((button) => {
    button.addEventListener("click", () => {
      const selectedPlace = items.find((place) => place.id === button.dataset.placeId);
      if (!selectedPlace) return;

      dialogTitle.textContent = selectedPlace.name;
      dialogDescription.textContent = selectedPlace.description;
      dialogAddress.textContent = selectedPlace.address;

      if (typeof dialog.showModal === "function") {
        dialog.showModal();
      } else {
        // Fallback for browsers without native dialog support.
        window.alert(`${selectedPlace.name}\n${selectedPlace.address}\n\n${selectedPlace.description}`);
      }
    });
  });
}

dialogClose.addEventListener("click", () => dialog.close());

dialog.addEventListener("click", (event) => {
  // Clicking the dark area outside the dialog closes it.
  if (event.target === dialog) dialog.close();
});

displayVisitMessage();
renderAttractions(attractions);
