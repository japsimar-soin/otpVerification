import mongoose from "mongoose";
import validator from "validator";

const userOtpSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true,
		validate(value) {
			if (!validator.isEmail(value)) {
				throw new Error("Invalid email");
			}
		},
	},
	otp: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
		index: { expires: "20m" },
	},
});

const UserOtp = mongoose.model("UserOtp", userOtpSchema);
export default UserOtp;
