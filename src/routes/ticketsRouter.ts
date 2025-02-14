import { Router } from "express"
import {
	getTickets,
	getTicket,
	postTicket,
	putTicket,
	deleteTicket,
	patchTicket,
	getLeastSold
} from "../controllers/tickets"

const ticketRoutes = Router()

ticketRoutes.get("/tickets", getTickets)
ticketRoutes.get("/tickets/find/:id", getTicket)
ticketRoutes.get("/tickets", postTicket)
ticketRoutes.get("/tickets/:id", putTicket)
ticketRoutes.get("/tickets/:id", deleteTicket)
ticketRoutes.get("/tickets/:id/add", patchTicket)
ticketRoutes.get("/tickets/least-sold", getLeastSold)

export default ticketRoutes