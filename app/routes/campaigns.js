import Ember from "ember";

export default Ember.Route.extend({
	model: function() {
		return Ember.RSVP.hash({
			campaigns: Ember.$.get("api/campaigns"),
			topology: Ember.$.get("api/topology")
		});
	}
});