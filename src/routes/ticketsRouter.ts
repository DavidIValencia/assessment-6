import { Router } from "express"
import {
  getTickets,
  getTicket,
  postTicket,
  putTicket,
  deleteTicket,
  soldTickets
} from "../controllers/tickets"

const routes = Router()

routes.get("/", getTickets)
routes.get("/:id", getTicket)
routes.post("/", postTicket)
routes.put("/:id", putTicket)
routes.delete("/:id", deleteTicket)
routes.patch("/:id/sold", soldTickets)

export default routes
