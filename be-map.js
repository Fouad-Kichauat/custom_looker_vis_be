/**
 * Welcome to the Looker Visualization Builder! Please refer to the following resources 
 * to help you write your visualization:
 *  - API Documentation - https://github.com/looker/custom_visualizations_v2/blob/master/docs/api_reference.md
 *  - Example Visualizations - https://github.com/looker/custom_visualizations_v2/tree/master/src/examples
 **/

const visObject = {
 /**
  * Configuration options for your visualization. In Looker, these show up in the vis editor
  * panel but here, you can just manually set your default values in the code.
  **/
  options: {
    first_option: {
    	type: "string",
      label: "My First Option",
      default: "Default Value"
    },
    second_option: {
    	type: "number",
      label: "My Second Option",
      default: 42
    }
  },
 
 /**
  * The create function gets called when the visualization is mounted but before any
  * data is passed to it.
  **/
	create: function(element, config){
		element.innerHTML = "<h1>Ready to render!</h1>";
	},

 /**
  * UpdateAsync is the function that gets called (potentially) multiple times. It receives
  * the data and should update the visualization with the new data.
  **/
	updateAsync: function(data, element, config, queryResponse, details, doneRendering){
    // set the dimensions and margins of the graph
    //var margin = {top: 20, right: 20, bottom: 30, left: 40},
    //    width = 960 - margin.left - margin.right,
    //    height = 500 - margin.top - margin.bottom;

    // set the ranges
    //var x = d3.scaleBand()
    //          .range([0, width])
    //          .padding(0.1);
    //var y = d3.scaleLinear()
    //          .range([height, 0]);

    // append the svg object to the body of the page
    // append a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    // element.innerHTML = ""
    //var svg = d3.select("#vis").append("svg")
    //    .attr("width", width + margin.left + margin.right)
    //    .attr("height", height + margin.top + margin.bottom)
    //  .append("g")
    //    .attr("transform", 
    //          "translate(" + margin.left + "," + margin.top + ")");
    
    //formattedData = []

    // format the data
    //data.forEach(function(d) {
    //  formattedData.push({
    //  	count: d["game.count"]["value"],
    //    friendly_class: d["game.friendly_class"]["value"],
    //    opponent_class: d["game.opponent_class"]["value"]
     // });
    //});

    // Scale the range of the data in the domains
    //x.domain(formattedData.map(function(d) { return d.friendly_class; }));
    //y.domain([0, d3.max(formattedData, function(d) { return d.count; })]);

    // append the rectangles for the bar chart
    // svg.selectAll(".bar")
    //  .data(formattedData)
    //  .enter().append("rect")
      //.attr("class", "bar")
     // .attr("style", "fill: #6c43e0;")
     // .attr("x", function(d) { return x(d.friendly_class); })
      //.attr("width", x.bandwidth())
     // .attr("y", function(d) { return y(d.count); })
     // .attr("height", function(d) { return height - y(d.count); });

    // add the x Axis
   // svg.append("g")
   //   .attr("transform", "translate(0," + height + ")")
    //  .call(d3.axisBottom(x));

    // add the y Axis
    //svg.append("g")
    //  .call(d3.axisLeft(y));
    
    
     // append the svg object to the body of the page
    // append a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    element.innerHTML = ""
    
    var width = 1160;
    var height = 960;
    var scale = 25000;
    var offset = [width / 2, height / 2];
    var center = [0, 50.64];
    var rotate = [-4.668, 0];
    var parallels = [51.74, 49.34];

    var projection = d3.geoAlbers()
            .center(center)
            .rotate(rotate)
            .parallels(parallels)
            .scale(scale)
            .translate(offset);

    var path = d3.geoPath()
            .projection(projection);

    var svg = d3.select("#vis").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g");

     
		console.log("test")
    d3.json("https://raw.githubusercontent.com/arneh61/Belgium-Map/master/Provincies.json", function(error, be) {
      if (error) return console.error("error:", error, be);
			console.log("response", be)
      svg.append("path")
        .datum(topojson.feature(be, be.objects.layer))
        .attr("d", path);
      
      
      var bounds  = path.bounds(topojson.feature(be, be.objects.layer));
      var hscale  = scale*width  / (bounds[1][0] - bounds[0][0]);
      var vscale  = scale*height / (bounds[1][1] - bounds[0][1]);
      scale   = (hscale < vscale) ? hscale : vscale;
      offset  = [width - (bounds[0][0] + bounds[1][0])/2,
                 height - (bounds[0][1] + bounds[1][1])/2];
      var centroid = d3.geoCentroid(topojson.feature(be, be.objects.layer));
      center = [0, centroid[1]];
      rotate = [-centroid[0],0];

      projection = d3.geoAlbers()
        .center(center)
        .rotate(rotate)
        .parallels(parallels)
        .scale(scale)
        .translate(offset);

      path = path.projection(projection);

      svg.selectAll(".province")
        .data(topojson.feature(be, be.objects.layer).features)
        .enter()
        .append("path")
        .attr("class", function(d) { console.log(d.id); return "province " + d.id; })
      	.attr("style", function(d) { return "color=#F32FFF;"; })
	      .style("stroke", "#000")
      	.style("fill", "#FFF000")
        .attr("d", path);
      
      
      doneRendering()
    });

		
	}
};

looker.plugins.visualizations.add(visObject);
