const availableCities = [
  { name: "Los Angeles", zone: "America/Los_Angeles", id: "los-angeles" },
  { name: "Paris", zone: "Europe/Paris", id: "paris" },
  { name: "London", zone: "Europe/London", id: "london" },
  { name: "New York", zone: "America/New_York", id: "new-york" },
  { name: "Auckland", zone: "Pacific/Auckland", id: "auckland" },
];

let displayedCityIds = ["los-angeles", "paris"];

const dynamicContainer = document.getElementById("dynamic-cities");
const selectElement = document.getElementById("city-select");

function createCityElement(cityInfo) {
  const cityDiv = document.createElement("div");
  cityDiv.className = "city";
  cityDiv.id = cityInfo.id;

  cityDiv.setAttribute("role", "group");
  cityDiv.setAttribute("aria-label", cityInfo.name);
  cityDiv.tabIndex = 0; 

  cityDiv.innerHTML = `
    <div>
      <h2>${cityInfo.name}</h2>
      <div class="date"></div>
    </div>
    <div class="time" aria-live="polite"></div>
  `;

  dynamicContainer.appendChild(cityDiv);
  displayedCityIds.push(cityInfo.id);

  return cityDiv;
}

function highlightCity(cityId) {
  document
    .querySelectorAll(".city")
    .forEach((el) => el.classList.remove("highlighted"));
  const target = document.getElementById(cityId);
  if (target) {
    target.classList.add("highlighted");
    target.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}

function updateAllClocks() {
  document.querySelectorAll(".city").forEach((cityEl) => {
    const cityId = cityEl.id;
    const cityInfo = availableCities.find((c) => c.id === cityId);
    if (!cityInfo) return;

    const now = moment().tz(cityInfo.zone);

    const dateEl = cityEl.querySelector(".date");
    const timeEl = cityEl.querySelector(".time");

    if (dateEl) dateEl.textContent = now.format("MMMM Do YYYY");

    const time12 = now.format("h:mm:ss");
    const ampm = now.format("A");

    if (timeEl)
      timeEl.innerHTML = `${time12} <small aria-hidden="true">${ampm}</small>`;
  });
}

selectElement.addEventListener("change", () => {
  const selectedZone = selectElement.value;
  if (!selectedZone) return;

  const selectedCity = availableCities.find((c) => c.zone === selectedZone);
  if (!selectedCity) return;

  const cityId = selectedCity.id;

  if (displayedCityIds.includes(cityId)) {
    highlightCity(cityId);
  } else {
    createCityElement(selectedCity);
    highlightCity(cityId);
  }

  selectElement.value = "";
});

updateAllClocks();
setInterval(updateAllClocks, 1000);
