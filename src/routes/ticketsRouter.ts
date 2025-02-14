import { Router } from "express"
import {
    getTicket,
    getTickets,
    postTickets,
    putTicket,
    deleteTicket,
} from "../controllers/tickets"

const routes = Router()

routes.post("/", postTickets)
routes.get("/", getTickets)
routes.get("/", getTicket)
routes.put("/", putTicket)
routes.delete("/:id", deleteTicket)
routes.patch("/id", putTicket)

export default routes