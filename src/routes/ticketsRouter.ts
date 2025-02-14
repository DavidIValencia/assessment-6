import { Router } from "express"

import {
	getTickets,
	getTicket,
	postTicket,
	putTicket,
	deleteTicket,
    getLeastSoldTicket
} from "../controllers/ticket"

const routes = Router()

routes.get("/tickets/find/:id", getTicket); // Find a ticket by ID
routes.post("/tickets", postTicket); // Add a new ticket
routes.put("/tickets/:id", putTicket); // Update a ticket by ID
routes.delete("/tickets/:id", deleteTicket); // Delete a ticket by ID
routes.patch("/tickets/:id/add", incrementSoldTickets); // Increment the 'sold' field
routes.get("/tickets/least-sold", getLeastSoldTicket); // Get the ticket with the least sold

export default routes