export default function() {
	this.transition(
		this.debug(),
		this.inHelper("liquid-with"),
		this.toValue(function(newValue, oldValue) {
			return newValue && newValue.features && newValue.features.election_year && oldValue && oldValue.features && oldValue.features.election_year && newValue.features.election_year < oldValue.features.election_year;
		}),
		this.use("toRight", { duration: 1000 }),
		this.reverse("toLeft", { duration: 1000 })
	);

	this.transition(
		this.debug(),
		this.fromRoute("campaigns"),
		this.toRoute("campaigns.campaign.candidate"),
		this.useAndReverse("explode", { 
			matchBy: "candidate-photo-id",
			use: "fly-to"
		}, {
			use: "fade"
		})
	);
};