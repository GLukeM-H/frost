import { GraphQLJSONObject } from "graphql-type-json";
import { Visage, User } from "./models/index.js";

const resolvers = {
	JSONObject: GraphQLJSONObject,
	Query: {
		users: async (parent, { filter }) => {
			return await User.find(filter);
		},
		user: async (parent, { id }) => {
			return await User.findById(id);
		},
		visages: async (parent, { filter }) => {
			return await Visage.find(filter);
		},
		visage: async (parent, { id }) => {
			return await Visage.findById(id);
		},
	},
	Mutation: {
		addUser: async (parent, args) => {
			const user = new User(args);
			return await user.save();
		},
		updateUser: async (parent, { id, update }) => {
			return await User.findByIdAndUpdate(id, update);
		},
		deleteUser: async (parent, { id }) => {
			return await User.findByIdAndDelete(id);
		},
		addVisage: async (parent, args) => {
			// the root component is identified by having its
			// key be the same as the visage._id
			const visage = new Visage(args);
			const rootComp = visage.content.get("tempId");
			rootComp["_id"] = visage._id;
			visage.content.set(visage._id.toString(), rootComp);
			visage.content.delete("tempId");
			return await visage.save();
		},
		updateVisage: async (parent, { id, update }) => {
			return await Visage.findByIdAndUpdate(id, update);
		},
		deleteVisage: async (parent, { id }) => {
			return await Visage.findByIdAndDelete(id);
		},
	},
	User: {
		visage: async (parent) => {
			return await Visage.findOne({ ownerId: parent._id });
		},
	},
	Visage: {
		owner: async (parent) => {
			return await User.findById(parent.ownerId);
		},
	},
};

export default resolvers;
