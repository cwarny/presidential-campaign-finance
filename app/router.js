import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
	this.route("campaigns", { path: "/" }, function() {
		this.route("campaign", { path: "/campaign/:election_year" }, function() { // The dynamic portion of the URL needs to correspond to an actual field in the model, otherwise serialization won't work
			this.route("candidate", { path: "/candidate/:candidate_id" });
		}); 
	});
});

export default Router;
