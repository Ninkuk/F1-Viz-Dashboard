const BASE_URL = "https://ergast.com/api/f1";
const EXT = ".json";

function getSeasonRaceList(year) {
  return d3.csv("data/races.csv", (d) => {
    if (d.year == year) {
      return {
        round: d.round,
        name: d.name,
        raceId: d.raceId,
        circuitId: d.circuitId,
      };
    }
  });
}

function getSeasonCircuitCoordinates(circuits) {
  d3.csv("data/circuits.csv", (d) => {
    const ci = circuits.indexOf(d.circuitId);
    if (ci != -1) {
      circuits[ci] = {
        circuitId: d.circuitId,
        name: d.name,
        location: d.location,
        country: d.country,
        lat: d.lat,
        lng: d.lng,
        alt: d.alt,
      };
    }
  });

  console.log(circuits);
  return circuits;
}
