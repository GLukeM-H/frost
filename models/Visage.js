const mongoose = require("mongoose");
const { Schema } = mongoose;

//Create Schema
const ComponentSchema = new Schema({
	comp: { type: String, required: true },
	childIds: [String],
	parentId: { type: String, required: true },
	inner: Schema.Types.Mixed,
	props: {
		type: Map,
		of: Schema.Types.Mixed,
		required: true,
		default: {},
	},
});

const VisageSchema = new Schema({
	ownerId: String,
	content: {
		type: Map,
		of: ComponentSchema,
		default: {
			rootComp: {
				comp: "Grid",
				childIds: [],
				parentId: "",
				props: {
					key: "rootComp",
					id: "rootComp",
					container: true,
				},
			},
		},
	},
});

module.exports = { Visage: mongoose.model("Visage", VisageSchema) };
