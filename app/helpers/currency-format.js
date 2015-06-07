import Ember from "ember";
import numeral from "numeral";

export default Ember.Handlebars.makeBoundHelper(function(value, options) {
	var escaped = Ember.Handlebars.Utils.escapeExpression(value);
	return new Ember.Handlebars.SafeString(numeral(value).format("$0,0.00"));
});