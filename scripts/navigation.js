const menuButton = document.querySelector("#menuButton");
const mainNav = document.querySelector("#mainNav");

menuButton.addEventListener("click", () => {

    mainNav.classList.toggle("show");

    const menuOpen = mainNav.classList.contains("show");

    menuButton.setAttribute(
        "aria-expanded",
        menuOpen
    );

    menuButton.textContent = menuOpen
        ? "✕"
        : "☰";

});