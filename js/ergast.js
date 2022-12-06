// gets season race list
function getRaces(year) {
	return fetch(`https://ergast.com/api/f1/${year}.json`)
		.then((response) => response.json())
		.then((data) => {
			// console.log(data.MRData.RaceTable.Races);
			return data.MRData.RaceTable.Races;
		});
}

// get season drivers lisr
function getDrivers(year) {
	return fetch(`https://ergast.com/api/f1/${year}/drivers.json`)
		.then((response) => response.json())
		.then((data) => {
			// console.log(data.MRData.DriverTable.Drivers);
			return data.MRData.DriverTable.Drivers;
		});
}

function getDriverResults(year, driver) {
	return fetch(`https://ergast.com/api/f1/${year}/drivers/${driver}/results.json`)
		.then((response) => response.json())
		.then((data) => {
			let driverResults = [];
			racesData = data.MRData.RaceTable.Races;
			racesData.forEach(race => {
				// [{round, driver, points}]
				driverResults.push({
					round: race["round"],
					driverID: race["Results"][0]["Driver"]["code"],
					points: race["Results"][0]["points"]
				})
			});

			return driverResults;
		});
}

// gets the result from a given round in a season
function getRaceResults(year, round) {
	return fetch(`https://ergast.com/api/f1/${year}/${round}/results.json`)
		.then((response) => response.json())
		.then((data) => {
			return data.MRData.RaceTable.Races[0].Results;
		});
}

// gets the overall driver standings from a seaon
function getDriverStandings(year) {
	return fetch(`https://ergast.com/api/f1/${year}/driverStandings.json`)
		.then((response) => response.json())
		.then((data) => {
			return data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
		});
}

// gets the overall constructor standings from a seaon
function getConstructorStandings(year) {
	return fetch(`https://ergast.com/api/f1/${year}/constructorStandings.json`)
		.then((response) => response.json())
		.then((data) => {
			return data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
		});
}

// gets the total point of a driver in a season
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

// gets the total point of a constructor in a season
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