const { GraphQLObjectType, GraphQLString, GraphQLSchema } = require("graphql");

const User = {
	name: "Luke",
	username: "glukem",
	password: "I forgot...",
};

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
	creator: User,
	contentComp: ContentComp,
};

const UserType = new GraphQLObjectType({
	name: "user",
	fields: () => ({
		name: { type: GraphQLString, resolve: () => User.name },
		username: { type: GraphQLString, resolve: () => User.username },
		password: { type: GraphQLString, resolve: () => User.password },
	}),
});

const VisageType = new GraphQLObjectType({
	name: "visage",
	fields: () => ({
		id: { type: GraphQLString, resolve: () => Visage.id },
		creator: { type: UserType, resolve: () => Visage.creator },
		contentComp: {
			type: GraphQLString,
			resolve: () => JSON.stringify(Visage.contentComp),
		},
	}),
});

const RootQuery = new GraphQLObjectType({
	name: "RootQueryType",
	fields: () => ({
		user: {
			type: UserType,
			resolve: () => User,
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
