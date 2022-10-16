// The svg
const width = 1500;
const height = 1000;

const svg = d3.select("svg");
svg.attr("width", width);
svg.attr("height", height);

// Map and projection
const projection = d3
  .geoMercator()
  .scale(250)
//   .center([0, 0])
  .translate([width / 2, height / 2]);
const pathGenerator = d3.geoPath().projection(projection);

d3.json("https://unpkg.com/world-atlas@2.0.2/countries-50m.json").then(
  (data) => {
    const countries = topojson.feature(data, data.objects.countries);
    svg
      .selectAll("path")
      .data(countries.features)
      .enter()
      .append("path")
      .attr("d", pathGenerator)
      .attr("fill", "#00bfa5");
  }
);
