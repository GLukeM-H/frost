const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLList,
	GraphQLSchema,
	GraphQLNonNull,
	GraphQLID,
} = require("graphql");
const { GraphQLJSONObject, GraphQLJSON } = require("graphql-type-json");
const { Visage } = require("./models/Visage");
const { User } = require("./models/User");

// Types
const UserType = new GraphQLObjectType({
	name: "user",
	fields: () => ({
		id: { type: new GraphQLNonNull(GraphQLID) },
		name: { type: GraphQLString },
		username: { type: GraphQLString },
		password: { type: GraphQLString },
		visage: {
			type: VisageType,
			resolve: async (parent) => {
				const visage = await Visage.findOne({ ownerId: parent._id });
				return visage;
			},
		},
	}),
});

const VisageType = new GraphQLObjectType({
	name: "visage",
	fields: () => ({
		id: {
			type: new GraphQLNonNull(GraphQLID),
			resolve: (parent) => parent._id,
		},
		owner: { type: UserType, resolve: () => Visage.owner },
		contentComp: {
			type: GraphQLJSONObject,
			args: {
				id: { type: GraphQLString },
			},
			resolve: (parent, args) => Page.findById(args.id),
		},
	}),
});

// Query
const RootQuery = new GraphQLObjectType({
	name: "RootQueryType",
	fields: () => ({
		users: {
			type: new GraphQLList(UserType),
			resolve: async () => {
				const users = await User.find();
				return users;
			},
		},
		user: {
			type: UserType,
			args: {
				id: { type: new GraphQLNonNull(GraphQLID) },
			},
			resolve: async (parent, { id }) => {
				const user = await User.findById(id);
				return user;
			},
		},
		visage: {
			type: VisageType,
			resolve: () => Visage,
		},
	}),
});

// Mutations
const mutation = new GraphQLObjectType({
	name: "mutation",
	fields: () => ({
		addUser: {
			type: UserType,
			args: {
				name: { type: GraphQLString },
				username: { type: new GraphQLNonNull(GraphQLString) },
				password: { type: new GraphQLNonNull(GraphQLString) },
			},
			resolve: async (parent, args) => {
				const user = new User(args);
				const returnedUser = await user.save();
				return returnedUser;
			},
		},
		deleteUser: {
			type: UserType,
			args: {
				id: { type: new GraphQLNonNull(GraphQLID) },
			},
			resolve: async (parent, { id }) => {
				const user = await User.findByIdAndDelete(id);
				return user;
			},
		},
	}),
});

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation,
});
