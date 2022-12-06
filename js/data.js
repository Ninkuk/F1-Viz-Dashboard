// AXIS //
// x-axis: [countries]
// y-axis: [drivers]
// z-axis: [{country, driver, points}]

function getHeatmapData(year) {
	// Remove previous content
	d3.select('#driverPointsHeatmap').selectAll("*").remove();
	d3.select('#constructorPointsHeatmap').selectAll("*").remove();

	// Show loading
	// https://getbootstrap.com/docs/5.2/components/spinners/

	// get races list
	const raceSchedule = getRaces(year);

	// get driver standings
	const driverStandings = getDriverStandings(year);


	Promise.all([raceSchedule, driverStandings]).then((values) => {
		const countries = []; // xAxis Data
		
		values[0].forEach((race) => {
			countries.push(race["Circuit"]["Location"]["country"])
		})

		const driverCodes = []; // yAxis Data
		const driverResults = []; // heatmap data
		
		values[1].forEach((driver) => {
			driverCodes.push(driver["Driver"]);
			driverResults.push(getDriverResults(year, driver["Driver"]["driverId"]));
		});

		renderDriverPointsHeatmap(countries, driverCodes, driverResults)
	});
}