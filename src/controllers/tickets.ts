import Ticket from "../models/Ticket"
import HTTPHandler from "../utils/HTTPHandler"

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
		if (req.query["show"] !== undefined) {
			query.show = new RegExp(req.query["show"] as string, "i")
		}
		if (req.query["min-sold"] !== undefined) {
			query.sold = { $gte: req.query["min-sold"] }
		}

		const tickets = await Ticket.find(query)
		if (tickets.length === 0) {
			throw new Error("Ticket Not Found")
		} else {
			res.status(200).send(tickets)
		}
	} catch (error) {
		res.status(500).send("Bad Request!")
	}
}

export const getTicket: HTTPHandler = async (req, res) => {
	try {
		const ticket = await Ticket.findById(req.params.id)
		res.status(200).send(ticket)
	} catch (error) {
		res.status(404).send("Ticket Not Found")
	}
}

export const updateTicketById: HTTPHandler = async (req, res) => {
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

export const deleteTicket: HTTPHandler = async (req, res) => {
	try {
		await Ticket.findByIdAndDelete(req.params.id)
		res.status(204).send()
	} catch (error) {
		res.status(404).send("Ticket Not Found")
	}
}

export const updateTicketsSold: HTTPHandler = async (req, res) => {
	try {
		const ticket = await Ticket.findById(req.params.id)
		if (!ticket) {
			throw new Error("Ticket Not Found")
		} else {
			ticket.sold = ticket.sold + req.body.sold
		}
		await ticket.save()
		res.status(200).send({ success: true })
	} catch (error) {
		res.status(404).send("Ticket Not Found")
	}
}

export const getLeastSoldTicket: HTTPHandler = async (req, res) => {
	try {
		const lowestSoldTicket = await Ticket.findOne().sort({ sold: 1 })
		if (!lowestSoldTicket) {
			res.status(404).send("Ticket Not Found")
		} else {
			res.status(200).send(lowestSoldTicket)
		}
	} catch (error) {
		res.status(500).send("Bad Request!")
	}
}
