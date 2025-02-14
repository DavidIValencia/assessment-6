import { Router } from "express"
import { deleteTicket, getTicket, getTicketLeastSold, getTickets, patchTicket, postTicket, putTicket } from "../controllers/tickets"

const routes = Router()

routes.post("/tickets", postTicket)
routes.get("/:id", getTicket)
routes.get("/", getTickets)
routes.get("/least-sold", getTicketLeastSold)
routes.put("/:id", putTicket)
routes.patch("/:id/add", patchTicket)
routes.delete(":id", deleteTicket)

export default routes