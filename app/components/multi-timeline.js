import Ember from "ember";

/* global d3 */

export default Ember.Component.extend({
	tagName: "svg",
	attributeBindings: ["width", "height"],

	margin: { top: 20, right: 80, bottom: 40, left: 80 },
	width: 600,
	height: 300,

	focusW: function() {
		var width = this.get("width"),
			margin = this.get("margin");
		return width - margin.left - margin.right;
	}.property("width"),

	focusH: function() {
		var height = this.get("height"),
			margin = this.get("margin");
		return height - margin.top - margin.bottom;
	}.property("height"),

	transformG: function() {
		var margin = this.get("margin");
		return "translate(" + margin.left + "," + margin.top + ")";
	}.property(),

	seriesNames: Ember.computed.mapBy("data", "name"),

	xScale: function() {
		var data = this.get("data");
		return d3.time.scale()
			.domain([
				d3.min(data, function(c) { return d3.min(c.values, function(v) { return v.timestamp; }); }),
				d3.max(data, function(c) { return d3.max(c.values, function(v) { return v.timestamp; }); })
			])
			.range([ 0, this.get("focusW") ]);
	}.property("focusW", "data.@each"),

	yScale: function() {
		var data = this.get("data");
		return d3.scale.linear()
			.domain([
				d3.min(data, function(c) { return d3.min(c.values, function(v) { return v.value; }); }),
				d3.max(data, function(c) { return d3.max(c.values, function(v) { return v.value; }); })
			])
			.range([ this.get("focusH"), 0 ]);
	}.property("focusH", "data.@each"),

	cScale: function() {
		return d3.scale.category10()
			.domain(this.get("seriesNames"));
	}.property("seriesNames"),

	xAxis: function() {
		return d3.svg.axis()
			.scale(this.get("xScale"))
			.orient("bottom");
	}.property("xScale"),

	yAxis: function() {
		return d3.svg.axis()
			.scale(this.get("yScale"))
			.orient("left");
	}.property("yScale"),

	transformX: function() {
		return "translate(0," + this.get("focusH") + ")";
	}.property("focusH"),

	line: function() {
		var xScale = this.get("xScale"),
			yScale = this.get("yScale");

		return d3.svg.line()
			.interpolate("basis")
			.x(function(d) { return xScale(d.timestamp); })
			.y(function(d) { return yScale(d.value); });
	}.property("xAxis", "yAxis"),

	didInsertElement: function() {
		var focusW = this.get("focusW"),
			focusH = this.get("focusH"),
			xAxis = this.get("xAxis"),
			yAxis = this.get("yAxis"),
			xScale = this.get("xScale"),
			yScale = this.get("yScale"),
			cScale = this.get("cScale"),
			svg = d3.select(this.get("element")),
			g = svg.select("g"),
			line = this.get("line"),
			data = this.get("data");

		g.select(".x-axis-group").call(xAxis);
		g.select(".y-axis-group")
			.call(yAxis)
			.append("text")
			.attr("transform", "rotate(-90)")
			.attr("y", 6)
			.attr("dy", ".71em")
			.style("text-anchor", "end")
			.text("Amounts (USD)");

		var series = g.select(".chart-group").selectAll(".series")
			.data(data)
			.enter().append("g")
			.attr("class", "series");

		series.append("path")
			.attr("class", "line")
			.attr("d", function(d) { return line(d.values); })
			.style("stroke", function(d) { return cScale(d.name); });

		// series.append("text")
		// 	.datum(function(d) { return { name: d.name, value: d.values[d.values.length - 1] }; })
		// 	.attr("transform", function(d) { return "translate(" + xScale(d.value.timestamp) + "," + yScale(d.value.value) + ")"; })
		// 	.attr("x", 3)
		// 	.attr("dy", ".35em")
		// 	.text(function(d) { return d.name; });

	},

	redraw: function() {
		var xScale = this.get("xScale"),
			yScale = this.get("yScale"),
			svg = d3.select(this.get("element")),
			g = svg.select("g"),
			xAxis = this.get("xAxis"),
			yAxis = this.get("yAxis"),
			line = this.get("line"),
			data = this.get("data");

		var series = g.selectAll(".series")
			.data(data);

		series.exit().remove();

		series.select("path").transition().duration(500).attr("d", function(d) { return line(d.values); });

		// series.select("text")
		// 	.datum(function(d) { return { name: d.name, value: d.values[d.values.length - 1] }; })
		// 	.attr("transform", function(d) { return "translate(" + xScale(d.value.timestamp) + "," + yScale(d.value.value) + ")"; });
		
		g.select(".x-axis-group").call(xAxis);
		g.select(".y-axis-group").call(yAxis);

	}.observes("line"),

});