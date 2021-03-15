const express = require("express");
const mongoose = require("mongoose");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema.js");

const pages = require("./routes/api/pages");

const app = express();

app.use(
	"/graphql",
	graphqlHTTP({
		schema: schema,
		graphiql: true,
	})
);

// BodyParser Middleware
app.use(express.json());

// DB Config
const db = require("./config/keys").mongoURI;
// const { schema } = require("./models/Page");

// Connect to mongo
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection
	.once("open", () => console.log("MongoDB Connected!"))
	.on("error", (e) => console.log(e));

// Use Routes
app.use("/api/pages", pages);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
