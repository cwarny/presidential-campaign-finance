import Ember from "ember";

export default Ember.Route.extend({
	model: function() {
		return Ember.$.get("api/campaigns");
	}
});