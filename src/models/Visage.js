import mongoose from "mongoose";
const { Schema } = mongoose;

const ComponentSchema = new Schema({
	comp: { type: String, required: true, default: "Grid" },
	childIds: [String],
	parentId: { type: String },
	inner: Schema.Types.Mixed,
	props: {
		type: Map,
		of: Schema.Types.Mixed,
		required: true,
	},
});

const VisageSchema = new Schema({
	ownerId: { type: Schema.Types.ObjectId, required: true },
	name: { type: String, required: true },
	rootId: { type: String, required: true },
	content: {
		type: Map,
		of: ComponentSchema,
		required: true,
	},
});

const Visage = mongoose.model("Visage", VisageSchema);

export default Visage;
