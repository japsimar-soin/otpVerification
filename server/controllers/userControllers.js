import User from "../models/userSchema.js";
import UserOtp from "../models/userOtp.js";
import nodemailer from "nodemailer";
import "dotenv/config";

const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: process.env.EMAIL,
		pass: process.env.PASSWORD,
	},
});

export const userRegister = async (req, res) => {
	const { fname, email, password } = req.body;
	if (!fname || !email || !password) {
		res.status(400).json({ error: "All fields are mandatory" });
	}

	try {
		const userExists = await User.findOne({ email: email });
		if (userExists) {
			res.status(400).json({ error: "Email already registered. Please login" });
		} else {
			const userregister = new User({ fname, email, password });
			const storeData = await userregister.save();
			res.status(200).json(storeData);
		}
	} catch (error) {
		res.status(400).json({ error: "Invalid credentials", error });
	}
};

export const sendUserOtp = async (req, res) => {
	const { email } = req.body;
	if (!email) {
		res.status(400).json({ error: "Enter your email" });
	}

	try {
		const userExists = await User.findOne({ email: email });
		if (userExists) {
			const otp = Math.floor(Math.random() * 900000 + 100000);

			const emailExists = await UserOtp.findOne({ email: email });
			if (emailExists) {
				const updateData = await UserOtp.findByIdAndUpdate(
					{ _id: emailExists._id },
					{ otp: otp },
					{ new: true }
				);
				await updateData.save();

				const mailOptions = {
					from: process.env.EMAIL,
					to: email,
					subject: "Verify Otp",
					text: `OTP: ${otp}`,
				};
				transporter.sendMail(mailOptions, (error, info) => {
					if (error) {
						console.log("error", error);
						res.status(400).json({ error: "Email not sent" });
					} else {
						console.log("Email sent on registered email id", info.response);
						res.status(200).json({ message: "Email sent successfully" });
					}
				});
			} else {
				const saveOtpData = new UserOtp({ email, otp: otp });
				await saveOtpData.save();
				const mailOptions = {
					from: process.env.EMAIL,
					to: email,
					subject: "Verify Otp",
					text: `OTP: ${otp}`,
				};
				transporter.sendMail(mailOptions, (error, info) => {
					if (error) {
						console.log("error", error);
						res.status(400).json({ error: "Email not sent" });
					} else {
						console.log("Email sent on registered email id", info.response);
						res.status(200).json({ message: "Email sent successfully" });
					}
				});
			}
		} else {
			res.status(400).json({ error: "User does not exist" });
		}
	} catch (error) {
		res.status(400).json({ error: "Invalid credentials", error });
	}
};

export const userLogin = async (req, res) => {
	const { email, otp } = req.body;
	if (!otp || !email) {
		res.status(400).json({ error: "Both fields are required" });
	}
	try {
		const otpGenerated = await UserOtp.findOne({ email: email });
		if (otpGenerated.otp === otp) {
			const userExists = await User.findOne({email: email});
			const token = await userExists.generateAuthToken();
			res.status(200).json({message: "User logged in successfully", userToken: token});
		} else {
			res.status(400).json({ error: "OTP doesn't match" });
		}
	} catch (error) {
		res.status(400).json({ error: "invalid details", error });
	}
};
