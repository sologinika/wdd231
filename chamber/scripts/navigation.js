// ===============================
// RESPONSIVE NAVIGATION
// ===============================

const menuButton = document.querySelector("#menu-button");

const navigation = document.querySelector("#primary-navigation");


// OPEN AND CLOSE MENU

menuButton.addEventListener("click", () => {

    navigation.classList.toggle("open");

    const isOpen = navigation.classList.contains("open");

    menuButton.setAttribute("aria-expanded", isOpen);

    menuButton.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );

    menuButton.textContent = isOpen ? "✕" : "☰";

});


// CLOSE MENU AFTER CLICKING A LINK

const navigationLinks = navigation.querySelectorAll("a");

navigationLinks.forEach(link => {

    link.addEventListener("click", () => {

        navigation.classList.remove("open");

        menuButton.setAttribute("aria-expanded", "false");

        menuButton.setAttribute(
            "aria-label",
            "Open navigation menu"
        );

        menuButton.textContent = "☰";

    });

});