const { gql } = require("apollo-server");

const typeDefs = gql`
	scalar JSONObject

	type Query {
		users: [User]
		user(id: ID!): User
		visages: [Visage]
		visage(id: ID!): Visage
	}

	type Mutation {
		addUser(name: String, username: String!, password: String!): User!
		modifyUser(id: ID!, update: UserUpdate!): User!
		deleteUser(id: ID!): User
		addVisage(ownerId: ID!): Visage!
		modifyVisage(id: ID!, update: VisageUpdate): Visage!
		deleteVisage(id: ID!): Visage
	}

	type User {
		_id: ID!
		name: String
		username: String!
		password: String!
		email: String
		visage: Visage
	}

	type Visage {
		_id: ID!
		ownerId: ID!
		owner: User
		content: JSONObject
	}

	input UserUpdate {
		name: String
		username: String
		password: String
		email: String
		visageId: String
	}

	input VisageUpdate {
		contentComp: JSONObject
		ownerId: ID
	}
`;

module.exports = typeDefs;
