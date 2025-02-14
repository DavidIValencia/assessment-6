import { Router } from "express";
import mongoose from "mongoose";
import HTTPHandler from "../src/utils/HTTPHandler";

const router = express.Router();

const ticketSchema = new mongoose.Schema({
    show: { type: String, required: true },
    section: { type: String, required: true },
    sold: { type: Number, required: true },
});

const Ticket = mongoose.model("Ticket", ticketSchema);

export const postTicket: HTTPHandler = async (req, res) => {
    try {
        const ticket = new Ticket(req.body)
        await ticket.save()
        res.status(201).send(ticket)
    } catch (error) {
        res.status(400).send("Bad Request")
    }
}

export const getTickets: HTTPHandler = async (req, res) => {
    try {
        const query: any = {}
        if (req.query["search-term"] !== undefined) {
            query.setUp = new RegExp(req.query["search-term"] as string)
        }
        if (req.query["min-sold"] !== undefined) {
            query.rating = {$gte: req.query["min-sold"]}
        }
        const tickets = await Ticket.find(query)
        res.status(200).send(tickets)
    } catch (error) {
        res.status(500).send("Internal Server Error")
    }
}


export default router;