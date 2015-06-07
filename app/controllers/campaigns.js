import Ember from "ember";

export default Ember.Controller.extend({
	campaignsSorting: ["election_year"],
	campaigns: Ember.computed.sort("model.campaigns", "campaignsSorting")
});