import mongoose from "mongoose";
import { ApolloServer } from "apollo-server-express";
import express from "express";

import typeDefs from "./src/typeDefs.js";
import resolvers from "./src/resolvers.js";
import { mongoURI } from "./config/keys.js";

const port = process.env.PORT || 5000;
const app = express();
const server = new ApolloServer({ typeDefs, resolvers });

server.applyMiddleware({ app });

// Connect to mongodb
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection
	.once("open", () => console.log("MongoDB Connected!"))
	.on("error", (e) => console.log(e));

// Listen on port
app.listen({ port }, () => {
	console.log(
		`Server started at http://localhost:${port}${server.graphqlPath}`
	);
});
