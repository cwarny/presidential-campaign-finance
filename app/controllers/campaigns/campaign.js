import Ember from "ember";
import groupBy from "ember-group-by";

/* global _ */

export default Ember.Controller.extend({
	needs: ["campaigns"],
	queryParams: ["cycle", "party"],

	cycle: "P",
	party: "D",

	seriesNames: ["contributions", "expenditures"],

	timelineData: function() {
		var features = this.get("model.features"),
			seriesNames = this.get("seriesNames"),
			cycle = this.get("cycle"),
			party = this.get("party");

		if (features.contributions.length > 0) features.contributions = features.contributions[0];

		return seriesNames.map(function(name) {
			return {
				name: name,
				values: features[name].timeline.filter(function(d) {
						return d.cycle === cycle && d.party === party;
					}).map(function(d) {
						return {
							value: d.value,
							timestamp: new Date(d.yearmonth)
						};
					}).sortBy("timestamp")
			};
		});
	}.property("model.features", "cycle", "party"),

	geoData: function() {
		var features = this.get("model.features"),
			cycle = this.get("cycle"),
			party = this.get("party");

		return features.contributions.geo.filter(function(d) {
			return d.cycle === cycle && d.party === party;
		});
	}.property("model.features", "cycle", "party"),

	candidates_per_party: groupBy("model.features.candidates", "party")

});