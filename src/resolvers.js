const { GraphQLJSONObject } = require("graphql-type-json");
const { Visage, User } = require("./models");

const resolvers = {
	JSONObject: GraphQLJSONObject,
	Query: {
		users: async () => {
			return await User.find();
		},
		user: async (parent, { id }) => {
			return await User.findById(id);
		},
		visages: async () => {
			return await Visage.find();
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
		modifyUser: async (parent, { id, update }) => {
			return await User.findByIdAndUpdate(id, update);
		},
		deleteUser: async (parent, { id }) => {
			return await User.findByIdAndDelete(id);
		},
		addVisage: async (parent, args) => {
			const visage = new Visage(args);
			const rootComp = visage.content.get("tempId");
			rootComp["_id"] = visage._id;
			visage.content.set(visage._id.toString(), rootComp);
			visage.content.delete("tempId");
			return await visage.save();
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

module.exports = resolvers;
