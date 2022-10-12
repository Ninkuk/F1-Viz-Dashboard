const yearRange = document.getElementById("yearRange");
const yearRangeText = document.getElementById("yearRangeText");

yearRange.value = 2010;
yearRangeText.value = 2010;

yearRange.addEventListener("change", (event) => {
  yearRangeText.value = event.target.value;
  getData(yearRangeText.value);
});

yearRangeText.addEventListener("change", (event) => {
  yearRange.value = event.target.value;
  getData(yearRange.value);
});

function getData(year) {
  getSeasonRaceList(yearRange.value).then((races) => {
    const circuits = [];
    races.forEach((race) => {
      circuits.push(race.circuitId);
    });
    getSeasonCircuitCoordinates(circuits);
  });
}
