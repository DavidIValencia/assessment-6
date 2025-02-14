import { Router } from "express"
import { deleteTicket, getLeastSold, getTicket, getTickets, patchTicketsSold, postTicket, putTicket } from "../controllers/tickets"

const routes = Router()

routes.post("/", postTicket)
routes.get("/", getTickets)
routes.get("/least-sold", getLeastSold)
routes.get("/:id", getTicket)
routes.put("/:id", putTicket)
routes.patch("/:id/add", patchTicketsSold)
routes.delete("/:id", deleteTicket)

export default routes