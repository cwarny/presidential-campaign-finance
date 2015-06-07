export default function() {
	// this.transition(
	// 	this.debug(),
	// 	this.fromModel(function(newModel, oldModel) {
	// 		debugger;
	// 		console.log("hey");
	// 		return oldModel && newModel && oldModel.get("election_year") > newModel.get("election_year");
	// 	}),
	// 	this.use("to-left")
	// );

	this.transition(
		this.debug(),
		this.inHelper("liquid-with"),
		this.use("fade")
	);

	// this.transition(
	// 	this.debug(),
	// 	this.toModel(function(newModel, oldModel) {
	// 		debugger;
	// 		console.log("yo");
	// 		return oldModel && newModel && oldModel.get("election_year") < newModel.get("election_year");
	// 	}),
	// 	this.use("to-right")
	// );

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