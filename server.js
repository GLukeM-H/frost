import dotenv from "dotenv";
import mongoose from "mongoose";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import expressJwt from "express-jwt";
import path from "path";

import typeDefs from "./src/typeDefs.js";
import resolvers from "./src/resolvers.js";

dotenv.config();

const port = process.env.PORT || 5000;
const app = express();
const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: ({ req }) => {
		const user = req.user || null;
		return { user };
	},
});

app.use(
	expressJwt({
		secret: process.env.SECRET,
		algorithms: ["HS256"],
		credentialsRequired: false,
	})
);

app.use((err, req, res, next) => {
	if (
		err.name === "UnauthorizedError" &&
		err.inner.toString() === "TokenExpiredError: jwt expired"
	) {
		res
			.status(err.status)
			.send({ error: "TokenExpiredError", message: err.message });
		return;
	}
	next();
});

if (process.env.NODE_ENV === "production") {
	app.use(express.static("client/build"));
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
}

server.applyMiddleware({ app });

// Connect to mongodb
mongoose.connect(process.env.MONGO_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

mongoose.connection
	.once("open", () => console.log("MongoDB Connected!"))
	.on("error", (e) => console.log(e));

// Listen on port
app.listen({ port }, () => {
	console.log(
		`Server started at http://localhost:${port}${server.graphqlPath}`
	);
});
