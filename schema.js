const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLList,
	GraphQLSchema,
} = require("graphql");
const { GraphQLJSONObject } = require("graphql-type-json");
const { Page } = require("./models/Page");

console.log(Page);

const User = {
	name: "Luke",
	username: "glukem",
	password: "I forgot...",
	visage: null,
};
const Users = [User];

const ContentComp = {
	rootComp: {
		comp: "Grid",
		childIds: [],
		parentId: null,
		props: {
			container: true,
		},
	},
};

const Visage = {
	id: "1",
	owner: User,
	contentComp: ContentComp,
};

const UserType = new GraphQLObjectType({
	name: "user",
	fields: () => ({
		name: { type: GraphQLString, resolve: () => User.name },
		username: { type: GraphQLString, resolve: () => User.username },
		password: { type: GraphQLString, resolve: () => User.password },
		visage: {
			type: VisageType,
			args: {
				owner: { type: GraphQLString },
			},
			resolve: (parent, args) => Page.findOne({ creator: args.owner }),
		},
	}),
});

const VisageType = new GraphQLObjectType({
	name: "visage",
	fields: () => ({
		id: { type: GraphQLString, resolve: () => Visage.id },
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

const RootQuery = new GraphQLObjectType({
	name: "RootQueryType",
	fields: () => ({
		users: {
			type: new GraphQLList(UserType),
			resolve: () => Users,
		},
		user: {
			type: GraphQLJSONObject,
			args: {
				username: { type: GraphQLString },
			},
			resolve: (parent, args) => Page.findOne({ creator: args.username }),
		},
		visage: {
			type: VisageType,
			resolve: () => Visage,
		},
	}),
});

module.exports = new GraphQLSchema({
	query: RootQuery,
});
