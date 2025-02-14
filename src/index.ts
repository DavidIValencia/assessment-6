import express, { json } from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import ticketsRouter from "./ticketsRouter"


// CONFIGURATIONS

dotenv.config()
const app = express()
app.use(cors())
app.use(json())

// ROUTES

app.use("/tickets", ticketsRouter);

// DATABASE CONNECTION

const PORT = process.env.PORT || 6001
const MONGO_URL = process.env.MONGO_URL || ""

mongoose.set("strictQuery", false)
mongoose
	.connect(MONGO_URL)
	.then(() => {
		app.listen(PORT, () =>
			console.log(`Connected at PORT:${PORT}`)
		)
	})
	.catch(err =>
		console.log(`${err}, did not connect!`)
	)
