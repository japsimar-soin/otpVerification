import mongoose from "mongoose";

const DB = process.env.DATABASE;

mongoose
	.connect(DB)
	.then(() => {
		console.log("established connection with database");
	})
	.catch((error) => {
		console.error("MongoDB connection error:", error);
	});
