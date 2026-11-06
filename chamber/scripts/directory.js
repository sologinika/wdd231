// Load chamber members from the JSON data source and render the directory.
const membersContainer = document.querySelector("#members-container");
const memberCount = document.querySelector("#member-count");
const gridButton = document.querySelector("#grid-view");
const listButton = document.querySelector("#list-view");

function renderMembers(members) {
  membersContainer.innerHTML = "";

  members.forEach((member) => {
    const card = document.createElement("article");
    card.className = "member-card";

    const logo = document.createElement("img");
    logo.src = `images/${member.image}`;
    logo.alt = `${member.name} logo`;
    logo.width = 112;
    logo.height = 78;
    logo.loading = "lazy";

    const name = document.createElement("h3");
    name.textContent = member.name;

    const category = document.createElement("p");
    category.className = "member-category";
    category.textContent = member.category;

    const address = document.createElement("p");
    address.textContent = member.address;

    const phone = document.createElement("p");
    phone.textContent = member.phone;

    const website = document.createElement("a");
    website.href = member.website;
    website.textContent = "Visit Website";
    website.target = "_blank";
    website.rel = "noopener noreferrer";

    const membership = document.createElement("span");
    membership.className = "membership";
    membership.textContent = `${member.membershipName} Member`;

    const description = document.createElement("p");
    description.className = "description";
    description.textContent = member.description;

    card.append(logo, name, category, address, phone, website, membership, description);
    membersContainer.appendChild(card);
  });

  memberCount.textContent = `${members.length} chamber members`;
}

function setView(view) {
  const isGrid = view === "grid";
  membersContainer.classList.toggle("members-grid", isGrid);
  membersContainer.classList.toggle("members-list", !isGrid);
  gridButton.classList.toggle("active", isGrid);
  listButton.classList.toggle("active", !isGrid);
  gridButton.setAttribute("aria-pressed", String(isGrid));
  listButton.setAttribute("aria-pressed", String(!isGrid));
}

gridButton.addEventListener("click", () => setView("grid"));
listButton.addEventListener("click", () => setView("list"));

async function getMembers() {
  try {
    const response = await fetch("data/members.json");
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
    const members = await response.json();
    renderMembers(members);
  } catch (error) {
    console.error("Unable to load chamber members:", error);
    memberCount.textContent = "Member directory could not be loaded.";
    membersContainer.innerHTML = '<p class="error-message">We could not load the member list. Run this page using VS Code Live Server and check that <strong>data/members.json</strong> exists.</p>';
  }
}

getMembers();
