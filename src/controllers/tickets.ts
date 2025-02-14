import Ticket from "../models/Ticket"
import HTTPHandler from "../utils/HTTPHandler"

// CREATE - POST TICKETS FROM BODY
// /tickets

export const postTicket: HTTPHandler = async (req, res) => {
    try {
        const ticket = new Ticket(req.body)
        await ticket.save()
        res.status(201).send(ticket)
    } catch (error) {
        res.status(400).send("Bad Request!")
    }
}

// READ MANY - GET TICKETS, PLUS QUERY PARAMS
// /tickets

export const getTickets: HTTPHandler = async (req, res) => {
    try {
        const query: any = {}
        if (req.query["show"] !== undefined) {
            query.show = {$regex: new RegExp(req.query["show"] as string)}
        }
        if (req.query["min-sold"] !== undefined) {
            query.sold = {$gte: req.query["min-sold"]}
        }
        const tickets = await Ticket.find(query)
        res.status(200).send(tickets)
    } catch (error) {
        res.status(500).send("Internal Server Error!")
    }
}

// READ ONE - GET TICKET BY PARAM ID
// /tickets/:id

export const getTicket: HTTPHandler = async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.id)
        res.status(200).send(ticket)
    } catch (error) {
        res.status(404).send("Ticket Not Found!")
    }
}

// READ SPECIFIC - GET THE TICKET WITH THE LOWEST SOLD
// /tickets/least-sold ***put this in routes above getTicket***

export const getLeastSold: HTTPHandler = async (req, res) => {
    try {
        const ticket = await Ticket.find().sort({sold: 1}).limit(1)
        res.status(200).send(ticket)
    } catch (error) {
        res.status(500).send("Internal Server Error!")
    }
}

// UPDATE WHOLE OBJECT - PUT TICKET BY PARAM ID
// /tickets/:id

export const putTicket: HTTPHandler = async (req, res) => {
    try {
        const ticket = await Ticket.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        )
        res.status(200).send(ticket)
    } catch (error) {
        res.status(404).send("Ticket Not Found!")
    }
}

// UPDATE OBJECT FIELD - PATCH SOLD FROM PARAM ID, INCREMENT BY GIVEN NUMBER
// /tickets/:id/add

export const patchTicketsSold: HTTPHandler = async (req, res) => {
    try {
        const { sold } = req.body
        const ticket = await Ticket.findById(req.params.id)
        if (!ticket) throw new Error("Ticket Not Found!")
        ticket.sold += sold
        await ticket.save()
        res.status(200).send(ticket)
    } catch (error) {
        res.status(404).send("Ticket Not Found!")
    }
}

// DESTROY - DELETE TICKET BY PARAM ID
// /tickets/:id

export const deleteTicket: HTTPHandler = async (req, res) => {
    try {
        const ticket = await Ticket.findByIdAndDelete(req.params.id)
        res.status(204).send()
    } catch (error) {
        res.status(404).send("Ticket Not Found!")
    }
}