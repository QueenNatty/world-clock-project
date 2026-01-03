
const cities = [
  { id: "los-angeles", zone: "America/Los_Angeles" },
  { id: "paris",       zone: "Europe/Paris" }
];

const cityData = cities.map(city => ({
  element: document.getElementById(city.id),
  dateEl:  document.querySelector(`#${city.id} .date`),
  timeEl:  document.querySelector(`#${city.id} .time`),
  zone:    city.zone
}));


function updateAllClocks() {
  cityData.forEach(city => {
    const now = moment().tz(city.zone);

    city.dateEl.textContent = now.format("MMMM Do YYYY");

    const time12 = now.format("h:mm:ss");
    const ampm   = now.format("A");

    city.timeEl.innerHTML = `${time12} <small>${ampm}</small>`;
  });
}

updateAllClocks();                 
setInterval(updateAllClocks, 1000); 