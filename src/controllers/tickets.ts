import Ticket from "../models/Ticket"
import HTTPHandler from "../utils/HTTPHandler"

//CREATE

export const postTickets: HTTPHandler = async (req, res) => {
    try {
        const ticket = new Ticket(req.body)
        await ticket.save()
        res.status(201).send(ticket)
    } catch (error) {
        res.status(400).send("Bad Request")
    }
}
//READ MANY

export const getTickets: HTTPHandler = async (req, res) => {
    try {
        const query: any = {}
        if (req.query["show, min-sold"] !== undefined) {
            query.rating = {$gte: req.query["min-sold"]}
        }
        if (req.query["least-sold"] !== undefined) {
            query.rating = {$gte: req.query["least-sold"]}
        }
        const tickets = await Ticket.find(query)
        res.status(200).send(tickets)
    } catch (error) {
        res.status(404).send("Not Found")
    }
} 

//READ ONE

export const getTicket: HTTPHandler = async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.id)
        res.status(200).send(ticket)
    } catch (error) {
        res.status(400).send("Ticket Not Found")
    }
}

//UPDATE

export const putTicket: HTTPHandler = async (req, res) => {
    try {
        const ticket = await Ticket.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true, runValidators: true}
        )
        res.status(200).send(ticket)
    } catch (error) {
        res.status(404).send("Ticket Not Found")
    }
}



//DESTROY

export const deleteTicket: HTTPHandler = async (req, res) => {
    try {
        await Ticket.findByIdAndDelete(req.params.id)
        res.status(204).send()
    } catch (error) {
        res.status(404).send("Ticket Not Found")
    }
}