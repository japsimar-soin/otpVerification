import express from "express";
import cors from "cors";
import router from "./routes/router.js";
import "dotenv/config";
import "./db/conn.js";

const PORT = process.env.PORT || 4002;
const app = express();

app.use(express.json());
app.use(cors());
app.use(router);

app.listen(PORT, () => {
	`Server is listening at Port ${PORT}`;
});
