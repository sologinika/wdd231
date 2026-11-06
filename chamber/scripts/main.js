// Shared site behaviour: mobile navigation and footer dates.
const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#primary-navigation");

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
  });
}

const yearElement = document.querySelector("#current-year");
if (yearElement) yearElement.textContent = new Date().getFullYear();

const modifiedElement = document.querySelector("#last-modified");
if (modifiedElement) {
  const modifiedDate = new Date(document.lastModified);
  modifiedElement.textContent = Number.isNaN(modifiedDate.getTime())
    ? "Date unavailable"
    : modifiedDate.toLocaleString("en-NG", {
        year: "numeric", month: "long", day: "numeric",
        hour: "2-digit", minute: "2-digit"
      });
}
