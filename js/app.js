// Year Range (Slider and Textfiels)
const yearRange = document.getElementById("yearRange");
const yearRangeText = document.getElementById("yearRangeText");

// Get seasons list
d3.csv("data/seasons.csv").then((data) => {
  // sort years
  const sortedSeasons = data.sort((a, b) => {
    return a.year - b.year;
  });

  // Set min/max for year range
  const min = sortedSeasons[0].year;
  const max = sortedSeasons[sortedSeasons.length - 1].year;

  yearRange.setAttribute("min", min);
  yearRange.setAttribute("max", max);
  yearRangeText.setAttribute("min", min);
  yearRangeText.setAttribute("max", max);

  yearRange.value = max - 10;
  yearRangeText.value = max - 10;

  renderViz(yearRange.value);
});

yearRange.addEventListener("change", (event) => {
  yearRangeText.value = event.target.value;
  getData(yearRange.value);
});

yearRangeText.addEventListener("change", (event) => {
  yearRange.value = event.target.value;
  getData(yearRangeText.value);
});

function renderViz(year) {
  const raceSchedule = getRaces(year);

  const driverStandings = getDriverStandings(year);
  const constructorStandings = getConstructorStandings(year);

  const driverTotalPoints = driverStandings.then((drivers) =>
    getDriverPoints(drivers)
  );
  const constructorTotalPoints = constructorStandings.then((constructors) =>
    getConstructorPoints(constructors)
  );

  const countries = raceSchedule.then((races) => {
    const countryList = [];
    races.forEach((race) => {
      getRaceResults(year, race.round).then((data) => console.log(data));
      countryList.push(race.Circuit.Location.country);
    });
    return countryList;
  });

  renderHeatmap(countries, driverStandings);
}

function getData(year) {}
