function getRaces(year) {
  return fetch(`https://ergast.com/api/f1/${year}.json`)
    .then((response) => response.json())
    .then((data) => {
      return data.MRData.RaceTable.Races;
    });
}

function getRaceResults(year, round) {
  return fetch(`https://ergast.com/api/f1/${year}/${round}/results.json`)
    .then((response) => response.json())
    .then((data) => {
      return data.MRData.RaceTable.Races[0].Results;
    });
}

function getDriverStandings(year) {
  return fetch(`https://ergast.com/api/f1/${year}/driverStandings.json`)
    .then((response) => response.json())
    .then((data) => {
      return data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
    });
}

function getConstructorStandings(year) {
  return fetch(`https://ergast.com/api/f1/${year}/constructorStandings.json`)
    .then((response) => response.json())
    .then((data) => {
      return data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
    });
}

function getDriverPoints(drivers) {
  const driverPoints = [];
  drivers.forEach((driver) => {
    driverPoints.push({
      name: `${driver.Driver.givenName} ${driver.Driver.familyName}`,
      points: driver.points,
    });
  });

  return driverPoints;
}

function getConstructorPoints(constructors) {
  const constructorPoints = [];
  constructors.forEach((constructor) => {
    constructorPoints.push({
      name: constructor.Constructor.name,
      points: constructor.points,
    });
  });

  return constructorPoints;
}
