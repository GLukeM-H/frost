const mongoose = require("mongoose");
const { ApolloServer } = require("apollo-server");
const typeDefs = require("./src/typeDefs.js");
const resolvers = require("./src/resolvers");

const server = new ApolloServer({ typeDefs, resolvers });

// Connect to mongodb
const { mongoURI } = require("./config/keys");
const Visage = require("./src/models/Visage.js");

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection
	.once("open", () => console.log("MongoDB Connected!"))
	.on("error", (e) => console.log(e));

// Listen on port
const port = process.env.PORT || 5000;

server.listen({ port }).then(({ url }) => {
	console.log(`Server started at ${url}`);
});
