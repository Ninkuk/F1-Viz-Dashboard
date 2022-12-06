function renderDriverPointsHeatmap(countries, driverCodes, driverResults) {
	// const card = document.getElementById('driverCard');
	// const cardStyles = window.getComputedStyle(card);
	const width = 1000;
	const height = 600;
	// const cardHeight = Number(cardStyles["height"].replace("px", ""));

	// set the dimensions and margins of the graph
	const margin = {
		top: 30,
		right: 30,
		bottom: 30,
		left: 30
	}

	const innerWidth = width - margin.left - margin.right;
	const innerHeight = height - margin.top - margin.bottom;

	// append the svg object to the body of the page
	const svg = d3.select('#driverPointsHeatmap');

	svg
		.attr("width", width)
		.attr("height", innerHeight + margin.top + margin.bottom)
	// .attr("margin-left", margin.left)

	// Build X scales and axis:
	const xScale = d3.scaleBand()
		.range([0, innerWidth])
		.domain(Array.from({
			length: countries.length
		}, (x, i) => `${i + 1}`))
		.padding(0.01);
	// const xAxis = d3.axisBottom(x).tickvalues(data)
	svg.append("g")
		.attr("transform", `translate(${margin.left}, ${margin.top})`)
		.call(d3.axisTop(xScale))

	// Build X scales and axis:
	const y = d3.scaleBand()
		.range([0, innerHeight])
		.domain(driverCodes.map((driver) => driver["code"]))
		.padding(0.01);

	svg.append("g")
		.attr("transform", `translate(${margin.left}, ${margin.top})`)
		.call(d3.axisLeft(y));

	Promise.all(driverResults).then(values => {
		const dr = [];

		let maxPoints = 0;

		values.forEach(results => {
			results.forEach(result => {
				if (Number(result["points"]) > maxPoints) {
					maxPoints = Number(result["points"]);
				}

				dr.push(result);
			});
		})

		// Build color scale
		const myColor = d3.scaleLinear()
			.range(["transparent", "#f44336"])
			.domain([0, maxPoints]);


		var tooltip = d3.select("body")
			.append("div")
			.attr("class", "tultip")
			.style("opacity", 0)

		tooltip.append('p').style('margin', 0);

		svg.selectAll()
			.data(dr, (data) => {
				return data.round + ":" + data.driverID;
			})
			.enter()
			.append("rect")
			.on("mouseover", function (event, d) {
				tooltip
					.style('opacity', 1)

				tooltip
					.style("left", `${event.pageX}px`)
					.style("top", `${event.pageY}px`);

				tooltip.select('p').html(`${d.driverID} scored ${d.points} points in round ${d.round}`)
			})
			.on("mousemove", function (event) {
				tooltip
					.style("left", `${event.pageX}px`)
					.style("top", `${event.pageY}px`);
			})
			.on("mouseout", function (d) {
				tooltip
					.style("opacity", 0);
			})
			.attr("x", function (data) {
				return xScale(data.round)
			})
			.attr("y", function (data) {
				return y(data.driverID)
			})
			.attr("transform", `translate(${margin.left}, ${margin.top})`)
			.attr("width", xScale.bandwidth())
			.attr("height", y.bandwidth())
			.style("fill", function (d) {
				return myColor(d.points)
			})
	})
}