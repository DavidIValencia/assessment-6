import Ticket from "../models/Ticket"
import HTTPHandler from "../utils/HTTPHandler"

// CREATE / POST

export const postTicket: HTTPHandler = async (req, res) => {
    try {
        const ticket = new Ticket(req.body)
        await ticket.save()
        res.status(201).send(ticket)
    } catch (error) {
        res.status(400).send("Bad Request")
    }
}

// READ MANY / GET (all)

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

export const getTicketLeastSold: HTTPHandler = async (req, res) => {
    try {
        const ticket = await Ticket.find().sort({ sold: 1 }).limit(1)
        res.status(200).send(ticket)
    } catch (error) {
        res.status(500).send("Internal Server Error")
    }
}

// READ ONE / GET (one)

export const getTicket: HTTPHandler = async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.id)
        res.status(200).send(ticket)
    } catch (error) {
        res.status(404).send("Ticket Not Found")
    }
}

// UPDATE / PUT

export const putTicket: HTTPHandler = async (req, res) => {
    try {
        const ticket = await Ticket.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        )
        res.status(200).send(ticket)
    } catch (error) {
        res.status(404).send("Ticket Not Found")
    }
}

// UPDATE / PATCH

export const patchTicket: HTTPHandler = async (req, res) => {
    try {
        const { id } = req.params
        const { sold } = req.body
        const ticket = await Ticket.findByIdAndUpdate(id, { $inc: {sold} }, { new: true, runValidators: true })
        if (!ticket) {
            res.status(404).send("Ticket Not Found")
        }
        res.status(200).send("success: true")
    } 
    catch (error) {
        res.status(404).send("Ticket Not Found")
    }
}

// DESTROY / DELETE

export const deleteTicket: HTTPHandler = async (req, res) => {
    try {
        await Ticket.findByIdAndDelete(req.params.id)
        res.status(200).send()
    }
    catch (err) {
        res.status(404).send("Ticket Not Found")
    }
}