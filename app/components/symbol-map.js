import Ember from "ember";

/* global d3, topojson */

export default Ember.Component.extend({
	tagName: "svg",
	attributeBindings: ["width", "height"],

	width: 600,
	height: 300,
	scale: "scale(0.5)",

	rScale: function() {
		var data = this.get("data");
		return d3.scale.sqrt()
			.domain([
				d3.min(data, function(d) { return d.properties.value; }),
				d3.max(data, function(d) { return d.properties.value; })
			])
			.range([ 2, 50 ]);
	}.property("focusW", "data.@each"),

	topologyPath: function() {
		return d3.geo.path();
	}.property(),

	featurePath: function() {
		return d3.geo.path();
	}.property(),

	d: function() {
		var path = this.get("topologyPath"), topology = this.get("topology");
		return path(topojson.feature(topology, topology.objects.states));
	}.property("topologyPath", "topology"),

	draw: function() {
		var rScale = this.get("rScale"),
			svg = d3.select(this.get("element")).select("g"),
			path = this.get("featurePath"),
			data = this.get("data");

		var symbol = svg.selectAll(".symbol")
			.data(data);

		symbol.exit()
			.remove();

		symbol.enter()
			.append("path")
			.attr("class", "symbol")
			.attr("d", path.pointRadius(function(d) { return rScale(d.properties.value); }));

		symbol.transition()
			.attr("d", path.pointRadius(function(d) { return rScale(d.properties.value); }));

	}.on("didInsertElement").observes("rScale")

});