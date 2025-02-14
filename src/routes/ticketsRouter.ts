import { Router } from "express"
import {
    getTicket,
    postTicket,
    putTicket,
    deleteTicket,
    incrementSoldCount
} from "../controllers/ticketsController"

const routes = Router()

routes.post("/", postTicket)                                  
routes.get("/:id", getTicket)                 
routes.put("/:id", putTicket)                 
routes.delete("/:id", deleteTicket)
routes.patch("/:id/add", incrementSoldCount)          

export default routes
