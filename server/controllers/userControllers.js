import User from "../models/userSchema.js";
import UserOtp from "../models/userOtp.js";
import nodemailer from "nodemailer";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
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
			return res
				.status(400)
				.json({ error: "Email already registered. Please login" });
		} else {
			const userregister = new User({
				fname,
				email,
				password,
				isVerified: false,
			});
			await userregister.save();
			res.status(200).json({
				message: "User registered successfully, please verify your email.",
			});
		}
		// const otp = Math.floor(Math.random() * 900000 + 100000);
		// const newOtp = new UserOtp({ email, otp });
		// await newOtp.save();

		// const mailOptions = {
		// 	from: process.env.EMAIL,
		// 	to: email,
		// 	subject: "Verify Your Email",
		// 	text: `Your OTP code is ${otp}`,
		// };
		// transporter.sendMail(mailOptions);

		// res.status(200).json({ message: "OTP sent to your email", email });
	} catch (error) {
		res.status(500).json({ error: "internal server error", error });
	}
};

export const verifyOtp = async (req, res) => {
	const { email, otp } = req.body;
	try {
		const userOtp = await UserOtp.findOne({ email });
		if (!userOtp || userOtp.otp !== otp) {
			return res.status(400).json({ error: "Invalid OTP" });
		}

		const user = await User.findOneAndUpdate({ email }, { isVerified: true });
		await UserOtp.findOneAndDelete({ email });

		res.status(200).json({ message: "User verified successfully", userToken: user.token });
	} catch (error) {
		res.status(500).json({ error: "Internal server error", error });
	}
};

export const sendUserOtp = async (req, res) => {
	const { email } = req.body;
	if (!email) {
		return res.status(400).json({ error: "Enter your email" });
	}

	try {
		const user = await User.findOne({ email: email });
		if (!user) {
			return res
				.status(400)
				.json({ error: "User does not exist. Please register first." });
		}

		const otp = Math.floor(Math.random() * 900000 + 100000);

		const emailExists = await UserOtp.findOne({ email: email });
		if (emailExists) {
			await UserOtp.findByIdAndUpdate(
				{ _id: emailExists._id },
				{ otp: otp },
				{ new: true }
			);
		} else {
			const saveOtpData = new UserOtp({ email, otp: otp });
			await saveOtpData.save();
		}

		const mailOptions = {
			from: process.env.EMAIL,
			to: email,
			subject: "Verify Otp",
			text: `OTP: ${otp}`,
		};
		transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
				console.log("error", error);
				return res.status(400).json({ error: "Email not sent" });
			} else {
				console.log("Email sent on registered email id", info.response);
				return res.status(200).json({ message: "Email sent successfully" });
			}
		});
	} catch (error) {
		res.status(400).json({ error: "Invalid credentials", error });
	}
};

export const userVerify = async (req, res) => {
	const { email, otp } = req.body;
	if (!otp || !email) {
		return res.status(400).json({ error: "Both fields are required" });
	}
	try {
		const otpGenerated = await UserOtp.findOne({ email: email });
		if (otpGenerated.otp === otp) {
			const userExists = await User.findOne({ email: email });
			userExists.isVerified = true;
			await userExists.save();
			const token = await userExists.generateAuthToken();
			res
				.status(200)
				.json({ message: "User logged in successfully", userToken: token });
		} else {
			res.status(400).json({ error: "OTP doesn't match" });
		}
	} catch (error) {
		res.status(400).json({ error: "Invalid details", error });
	}
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
            expiresIn: '1h',
        });

        res.status(200).json({ token, message: "Login successful" });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

export const userLogin = async (req, res) => {
	const { email, otp } = req.body;
	if (!otp || !email) {
		res.status(400).json({ error: "Both fields are required" });
	}
	try {
		const userOtp = await UserOtp.findOne({ email });
		if (userOtp && userOtp.otp === otp) {
			const user = await User.findOne({ email });
			const token = await user.generateAuthToken();
			await UserOtp.findOneAndDelete({ email });

			res
				.status(200)
				.json({ message: "User logged in successfully", userToken: token });
		} else {
			res.status(400).json({ error: "Invalid OTP" });
		}
	} catch (error) {
		res.status(500).json({ error: "internal server error", error });
	}
};

export const forgotPassword = async (req, res) => {};
export const resetPassword = async (req, res) => {};
