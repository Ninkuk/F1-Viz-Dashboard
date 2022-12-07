// Graph Dimensions
const width = 1000;
const height = 600;

//Graph margins
const margin = {
	top: 30,
	right: 30,
	bottom: 30,
	left: 30,
};

const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;


// Tooltip
var tooltip = d3
	.select("body")
	.append("div")
	.attr("class", "tultip")
	.style("opacity", 0);
tooltip.append("p").style("margin", 0);


// Color Scale for Pie Chart
let colorScale = d3.scaleOrdinal(d3.schemePaired);


function renderDriverPointsHeatmap(year) {
	// append the svg object to the body of the page
	const svg = d3.select("#pointsHeatmap");

	svg.selectAll("*").remove();

	svg
		.attr("width", width)
		.attr("height", innerHeight + margin.top + margin.bottom);

	// SHOW SPINNER TILL DATA LOADED
	document.getElementById("spinner").classList.remove("invisible");
	document.getElementById("spinner").classList.add("visible");

	// get races list
	const raceSchedule = getRaces(year);

	// get driver standings
	const driverStandings = getDriverStandings(year);

	Promise.all([raceSchedule, driverStandings]).then((values) => {
		const countries = []; // xAxis Data

		values[0].forEach((race) => {
			countries.push(countryConversion[race["Circuit"]["Location"]["country"]]);
		});

		const driverCodes = []; // yAxis Data
		const driverResults = []; // heatmap data

		values[1].forEach((driver) => {
			driverCodes.push(driver["Driver"]);
			driverResults.push(getDriverResults(year, driver["Driver"]["driverId"]));
		});

		// countries, driverCodes, driverResults

		// X AXIS
		const xScale = d3.scaleBand().range([0, innerWidth]).domain(countries);

		svg
			.append("g")
			.attr("transform", `translate(${margin.left}, ${margin.top})`)
			.call(d3.axisTop(xScale));

		// Y AXIS //
		const yScale = d3
			.scaleBand()
			.range([0, innerHeight])
			.domain(driverCodes.map((driver) => driver["code"]));

		svg
			.append("g")
			.attr("transform", `translate(${margin.left}, ${margin.top})`)
			.call(d3.axisLeft(yScale));

		Promise.all(driverResults)
			.then((results) => {
				const data = [];

				let maxPoints = 0;
				results.forEach((result) => {
					result.forEach((r) => {
						if (Number(r["points"]) > maxPoints) {
							maxPoints = Number(r["points"]);
						}

						data.push(r);
					});
				});

				// Build color scale
				const myColor = d3
					.scaleLinear()
					.range(["transparent", "#f44336"])
					.domain([0, maxPoints]);

				svg
					.selectAll()
					.data(data, (d) => {
						return d.round + ":" + d.driverID;
					})
					.enter()
					.append("rect")
					.on("mouseover", function (event, d) {
						tooltip.style("opacity", 1);

						tooltip
							.style("left", `${event.pageX}px`)
							.style("top", `${event.pageY}px`);

						tooltip
							.select("p")
							.html(
								`${d.driverID} scored ${d.points} points in ${d.round}`
							);
					})
					.on("mousemove", function (event) {
						tooltip
							.style("left", `${event.pageX}px`)
							.style("top", `${event.pageY}px`);
					})
					.on("mouseout", function (d) {
						tooltip.style("opacity", 0);
					})
					.attr("x", function (d) {
						return xScale(d.round);
					})
					.attr("y", function (d) {
						return yScale(d.driverID);
					})
					.attr("transform", `translate(${margin.left}, ${margin.top})`)
					.attr("width", xScale.bandwidth())
					.attr("height", yScale.bandwidth())
					.style("fill", "transparent")
					.transition()
					.style("fill", function (d) {
						return myColor(d.points);
					})
					.duration(500);
			})
			.finally(() => {
				document.getElementById("spinner").classList.remove("visible");
				document.getElementById("spinner").classList.add("invisible");
			});
	});
}

function renderStandingsCharts(year) {
	// append the svg object to the body of the page
	const svg = d3.select("#pointsBarChart");

	svg.selectAll("*").remove();

	svg
		.attr("width", width)
		.attr("height", innerHeight + margin.top + margin.bottom)
		.append("g")
		.attr("transform", `translate(${margin.left}, ${margin.top})`);

	// get driver standings
	const driverStandings = getDriverStandings(year);

	driverStandings.then((standings) => {
		console.log(standings);

		driverCodes = [];
		driverPoints = [];

		standings.forEach((standing) => {
			driverCodes.push(standing["Driver"]["code"]);
			driverPoints.push(standing["points"]);
		});

		// X AXIS
		const xScale = d3
			.scaleBand()
			.range([0, innerWidth])
			.domain(driverPoints.reverse());

		// Y AXIS
		const yScale = d3
			.scaleBand()
			.range([0, innerHeight])
			.domain(driverCodes)
			.padding(0.1);

		svg
			.append("g")
			.attr("transform", `translate(${margin.left}, ${margin.top})`)
			.call(d3.axisLeft(yScale));

		svg
			.selectAll("rect")
			.data(standings)
			.join("rect")
			.on("mouseover", function (event, d) {
				tooltip.style("opacity", 1);

				tooltip
					.style("left", `${event.pageX}px`)
					.style("top", `${event.pageY}px`);

				tooltip
					.select("p")
					.html(
						`${d["Driver"]["code"]} scored ${d["points"]} points and ${d["wins"]} wins in ${year}`
					);
			})
			.on("mousemove", function (event) {
				tooltip
					.style("left", `${event.pageX}px`)
					.style("top", `${event.pageY}px`);
			})
			.on("mouseout", function (d) {
				tooltip.style("opacity", 0);
			})
			.attr("transform", `translate(${margin.left}, ${margin.top})`)
			.attr("x", xScale(0))
			.attr("y", (d) => yScale(d["Driver"]["code"]))
			.attr("height", yScale.bandwidth())
			.attr("fill", "#f44336")
			.transition()
			.attr("width", (d) => xScale(d["points"]))
			.duration(1000);

		svg
			.selectAll("car")
			.data(standings)
			.join("svg:image")
			.on("mouseover", function (event, d) {
				tooltip.style("opacity", 1);

				tooltip
					.style("left", `${event.pageX}px`)
					.style("top", `${event.pageY}px`);

				tooltip
					.select("p")
					.html(
						`${d["Driver"]["code"]} scored ${d["points"]} points and ${d["wins"]} wins in ${year}`
					);
			})
			.on("mousemove", function (event) {
				tooltip
					.style("left", `${event.pageX}px`)
					.style("top", `${event.pageY}px`);
			})
			.on("mouseout", function (d) {
				tooltip.style("opacity", 0);
			})
			.attr("xlink:href", "img/f1-car.png")
			.attr("width", 30)
			.attr(
				"transform",
				`scale(1,1) translate(${margin.left + 5}, ${margin.top - 5})`
			)
			.attr("y", (d) => yScale(d["Driver"]["code"]))
			.transition()
			.attr("x", (d) => xScale(d["points"]))
			.duration(1000);
	});
}


function renderPie(year, driverId, svg) {
	svg.selectAll("*").remove();

	let g = svg
		.attr("width", height)
		.attr("height", height)
		.append("g")
		.attr("transform", `translate(${height / 2}, ${height / 2})`);


	let pie = d3.pie().value((d) => d[1]);

	getDriverSeasonStatus(year, driverId).then((driverStatus) => {
		let statusData = {};

		driverStatus.forEach((status) => {
			statusData[status["status"]] = status["count"]
		})

		g
			.selectAll('arc')
			.data(pie(Object.entries(statusData)))
			.join('path')
			.on("mouseover", function (event, d) {
				tooltip.style("opacity", 1);

				tooltip
					.style("left", `${event.pageX}px`)
					.style("top", `${event.pageY}px`);

				tooltip
					.select("p")
					.html(
						`${d["data"][0]}: ${d["data"][1]}`
					);
			})
			.on("mousemove", function (event) {
				tooltip
					.style("left", `${event.pageX}px`)
					.style("top", `${event.pageY}px`);
			})
			.on("mouseout", function (d) {
				tooltip.style("opacity", 0);
			})
			.attr('d', d3.arc()
				.innerRadius(0)
				.outerRadius(height / 2 - margin.left)
			)
			.attr('fill', d => colorScale(d["data"][0]))
			.attr("stroke", "black")
			.style("stroke-width", "2px")
			.style("opacity", 0.7)
	});
}