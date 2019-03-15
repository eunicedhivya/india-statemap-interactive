// alert("map js loaded")


// function getStateCode() {
// 	var selectedValue = document.getElementById("showbystate").value;
// 	console.log(selectedValue)
// 	map_function(loksabha_2019, selectedValue, data2014);
// }

// function getStateInfo(criteria) {
// 	return stateInfo.filter(function (obj) {
// 		return obj.STATE_CODE === criteria;
// 	})
// }

function draw_india_map(options){
	
	// //Empty container
	// d3.select(options["htmlElement"]).html(null)

	//Generate the svg container by targeting the html container
	const svg = d3.select(options["htmlElement"])
		.append("svg")
		.attr("class", "map")
		.attr("viewBox", "0 0 " + options.width + " " + options.height)
		.attr("preserveAspectRatio", "xMinYMin")
		.append("g")

	// Add a tooltip to visualization
	const tooltip = d3.select('body').append('div')
		.attr('class', 'hidden tooltipblock');

	//Get latlong, scale info of chosenstate
	// var chosenStateInfo = getStateInfo(chosenstate);

	//Enter latlong, scale info of chosenstate
	var projection = d3.geoMercator()
		.scale(800)
		.center([83, 23])
		.translate([options.width / 2, options.height / 2])

	var geoPath = d3.geoPath()
		.projection(projection)
// var j =0;
	d3.json(options.map, function (error, mapshape) {


		var allIndiaShape = topojson.feature(mapshape, mapshape.objects.collection).features;

		console.log(allIndiaShape);

		//draw and enter map based on mapshape data
		svg.selectAll(".constituency")
			.data(allIndiaShape).enter().append("path")
			.attr("d", geoPath)
			.attr("class", "states")
			.attr('fill', "white")
			.attr('stroke', "#666")
			.attr('stroke-width', "0.5")
			.attr('stroke-opacity', "0.5")
			
			

	});


} //draw_map function