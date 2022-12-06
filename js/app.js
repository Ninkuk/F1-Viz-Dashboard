// Year Range (Slider and Textfiels)
const yearRange = document.getElementById("yearRange");
const yearRangeText = document.getElementById("yearRangeText");

// range for years
const min = 2000;
const max = 2022;
const defaultYear = 2010;

// Set the range for slider and text
yearRange.setAttribute("min", min);
yearRange.setAttribute("max", max);
yearRangeText.setAttribute("min", min);
yearRangeText.setAttribute("max", max);

// Set default value for slider and text
yearRange.value = defaultYear;
yearRangeText.value = defaultYear;

// Re-render viz on slider change
yearRange.addEventListener("change", (event) => {
	yearRangeText.value = event.target.value;
	getHeatmapData(yearRange.value);
});

// Re-render viz on text-input change
yearRangeText.addEventListener("change", (event) => {
	yearRange.value = event.target.value;
	getHeatmapData(yearRange.value);
});

// render heatmap
getHeatmapData(yearRange.value);
