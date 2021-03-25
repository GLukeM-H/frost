import { GraphQLJSONObject } from "graphql-type-json";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Visage, User } from "./models/index.js";
import { secret } from "../config/keys.js";

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
		viewer: async (parent, args, { user }) => {
			return await User.findById(user.sub);
		},
	},
	Mutation: {
		addUser: async (parent, args) => {
			const hPassword = await bcrypt.hash(args.password, 10);
			const user = new User({ ...args, password: hPassword });
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
		login: async (parent, { username, password }) => {
			const [user] = await User.find({ username });
			try {
				if (await bcrypt.compare(password, user.password)) {
					return jwt.sign({ payload: { roles: "admin" } }, secret, {
						subject: user._id.toString(),
						algorithm: "HS256",
						expiresIn: "15m",
					});
				} else {
					throw Error;
				}
			} catch (err) {
				return err;
			}
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
