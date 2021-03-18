const mongoose = require("mongoose");
const { Schema } = mongoose;

const ComponentSchema = new Schema({
	comp: { type: String, required: true, default: "Grid" },
	childIds: [String],
	parentId: { type: String, default: "" },
	inner: Schema.Types.Mixed,
	props: {
		type: Map,
		of: Schema.Types.Mixed,
		required: true,
		default: {
			container: true,
		},
	},
});

const VisageSchema = new Schema({
	ownerId: { type: Schema.Types.ObjectId, required: true },
	content: {
		type: Map,
		of: ComponentSchema,
		default: {
			["tempId"]: ComponentSchema,
		},
	},
});

const Visage = mongoose.model("Visage", VisageSchema);

module.exports = Visage;
