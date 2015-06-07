import Ember from "ember";

export default Ember.Route.extend({
	model: function(params, transition) {
		return Ember.$.get("api/campaigns/%@/candidates/%@".fmt(transition.params["campaigns.campaign"].election_year, params.candidate_id));
	},
	renderTemplate: function(controller, model) {
		this.render({into:"application"});
	}
});