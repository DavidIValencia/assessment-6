import { Router } from "express"
import {
	deleteTicket,
	getLeastSoldTicket,
	getTicket,
	getTickets,
	updateTicketsSold,
	postTicket,
	updateTicketById,
} from "../controllers/tickets"

const routes = Router()

routes.post("/", postTicket)
routes.get("/", getTickets)
routes.get("/find/:id", getTicket)
routes.put("/:id", updateTicketById)
routes.delete("/:id", deleteTicket)
routes.patch("/:id/add", updateTicketsSold)
routes.get("/least-sold", getLeastSoldTicket)

export default routes
