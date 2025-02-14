import { Router } from "express";

import {
postTicket,
deleteTicket,
getTicket,
putTicket,
getTickets,
getTicketsLeastSold,
setTicketsSold

} from "../controllers/tickets"

const routes = Router()

routes.post("/", postTicket)
routes.get("/", getTickets)
routes.get("/least-old", getTicketsLeastSold)
routes.get("/", getTicket)
routes.put("/:id", putTicket)
routes.patch("/:id/add", setTicketsSold)
routes.delete("/:id", deleteTicket)

export default routes