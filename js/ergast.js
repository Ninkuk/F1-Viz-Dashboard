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
	return fetch(
		`https://ergast.com/api/f1/${year}/drivers/${driver}/results.json`
	)
		.then((response) => response.json())
		.then((data) => {
			let driverResults = [];
			racesData = data.MRData.RaceTable.Races;
			racesData.forEach((race) => {
				// [{round, driver, points}]
				driverResults.push({
					round: countryConversion[race["Circuit"]["Location"]["country"]],
					driverID: race["Results"][0]["Driver"]["code"],
					points: race["Results"][0]["points"],
				});
			});

			return driverResults;
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

function getDriverSeasonStatus(year, driverId) {
	return fetch(
		`https://ergast.com/api/f1/${year}/drivers/${driverId}/status.json`
	)
		.then((response) => response.json())
		.then((data) => {
			// console.log(data.MRData.StatusTable.Status);
			return data.MRData.StatusTable.Status;
		});
}
