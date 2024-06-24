import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";

const secret = process.env.SECRET_KEY;

const userSchema = new mongoose.Schema({
	fname: {
		type: String,
		required: true,
		trim: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		validate(value) {
			if (!validator.isEmail(value)) {
				throw new Error("Email is invalid");
			}
		},
	},
	password: {
		type: String,
		required: true,
		minlength: 6,
	},
	tokens: [
		{
			token: {
				type: String,
				required: true,
			},
		},
	],
});

userSchema.pre("save", async function (next) {
	if (this.isModified("password")) {
		this.password = await bcrypt.hash(this.password, 12);
	}
	next();
});

userSchema.methods.generateAuthToken = async function () {
	try {
		let newToken = jwt.sign({ _id: this._id }, secret, { expiresIn: "1d" });
		this.tokens = this.tokens.concat({token: newToken});
		await this.save();
		return newToken;
	} catch (error) {
		res.status(400).json(error);
	}
};

const User = mongoose.model("User", userSchema);
export default User;
