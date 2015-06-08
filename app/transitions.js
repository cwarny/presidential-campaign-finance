export default function() {
	// this.transition(
	// 	this.debug(),
	// 	this.inHelper("liquid-with"),
	// 	this.toValue(function(newValue, oldValue) {
	// 		return newValue && newValue.features && newValue.features.election_year && oldValue && oldValue.features && oldValue.features.election_year && newValue.features.election_year > oldValue.features.election_year;
	// 	}),
	// 	this.use("explode", {
	// 		pickOld: ".kaboum",
	// 		use: ["toLeft", { duration: 1000, movingSide: "old" }]
	// 	}, {
	// 		pickNew: ".kaboum",
	// 		use: ["toLeft", { duration: 1000, movingSide: "new"} ]
	// 	})
	// );

	// this.transition(
	// 	this.debug(),
	// 	this.inHelper("liquid-with"),
	// 	this.toValue(function(newValue, oldValue) {
	// 		return newValue && newValue.features && newValue.features.election_year && oldValue && oldValue.features && oldValue.features.election_year && newValue.features.election_year < oldValue.features.election_year;
	// 	}),
	// 	this.use("explode", {
	// 		pickOld: ".kaboum",
	// 		use: ["toRight", { duration: 1000, movingSide: "old" }]
	// 	}, {
	// 		pickNew: ".kaboum",
	// 		use: ["toRight", { duration: 1000, movingSide: "new" }]
	// 	})
	// );

	this.transition(
		this.debug(),
		this.inHelper("liquid-with"),
		this.toValue(function(newValue, oldValue) {
			return newValue && newValue.features && newValue.features.election_year && oldValue && oldValue.features && oldValue.features.election_year && newValue.features.election_year < oldValue.features.election_year;
		}),
		this.use("toRight"),
		this.reverse("toLeft")
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