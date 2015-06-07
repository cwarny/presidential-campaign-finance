import Ember from "ember";

export default Ember.Route.extend({
	model: function(params, transition) {
		return Ember.$.get("api/campaigns/" + params.election_year);
	}
});