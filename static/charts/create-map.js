
function filterDataBy(datasource, criterion){
	return datasource.filter(function(obj){
		return obj.ST_NAME === criterion;
	})
}

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


	//Enter latlong, scale info of chosenstate
	const projection = d3.geoMercator()
		.scale(800)
		.center([83, 23])
		.translate([options.width / 2, options.height / 2])

	const geoPath = d3.geoPath()
		.projection(projection)

	d3.json(options.map, function (error, mapshape) {


		let allIndiaShape = topojson.feature(mapshape, mapshape.objects.collection).features;

		console.log("allIndiaShape", allIndiaShape);

		//draw and enter map based on mapshape data
		svg.selectAll(".state")
			.data(allIndiaShape).enter().append("path")
			.attr("d", geoPath)
			.attr("class", "states")
			.attr('fill', "#e8e8e8")
			.attr('stroke', "#666")
			.attr('stroke-width', "0.5")
			.attr('stroke-opacity', "0.5")
			.on('click', function(d, i){
				let statewiseData = filterDataBy(data2014, d.properties.ST_NM);
				console.log(statewiseData[0].NO_LOKSABHASEATS)
				d3.select('#state-name').html('<b>' + d.properties.ST_NM + '</b>')
				d3.select('.number-of-lkseats span').html('<b>' + statewiseData[0].NO_LOKSABHASEATS + '</b>')
				d3.select('.number-of-const span').html('<b>' + statewiseData[0].NO_CONST + '</b>')
				d3.select('.no-of-pollingbooths span').html('<b>' + statewiseData[0].NO_POLLINGBOOTHS + '</b>')
				d3.select('.no-of-voters span').html('<b>' + statewiseData[0].NO_VOTERS + '</b>')
			})
			.on("mouseover", function(d,i){

				let show_data; 
				
				d3.select(this).attr("fill", "red");

				show_data = '<p><b>' + d.properties.ST_NM + '</b></p>';

				tooltip.classed('hidden', false)
					.html(show_data)
					.style("left", (d3.event.pageX + 10) + "px")
					.style("top", d3.event.pageY + "px") 
			})
			.on("mouseout", function(d,i){
				d3.select(this).attr("fill", "#e8e8e8");
				tooltip.classed('hidden', true)
			})

	});


} //draw_map function