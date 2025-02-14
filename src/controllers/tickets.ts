import Ticket from "../models/Ticket";
import HTTPHandler from "../utils/HTTPHandler";

// Create

export const postTicket: HTTPHandler = async (
	req,
	res
) => {
	try {
		const ticket = new Ticket(req.body)
		await ticket.save()
		res.status(201).send(ticket)
	} catch (error) {
		res.status(400).send("Bad Request")
	}
}

// READ MANY

export const getTickets: HTTPHandler = async (
	req,
	res
) => {
	try {
		const query: any = {}
		if (req.query["show"] !== undefined) {
			query.show = new RegExp(
				req.query["show"] as string
			)
		}
		if (req.query["min-sold"] !== undefined) {
			query.sold = { $gte: req.query["min-sold"] }
		}
		const tickets = await Ticket.find(query)
		res.status(200).send(tickets)
	} catch (error) {
		res.status(500).send("Internal Server Error")
	}
}


export const getTicketsLeastSold: HTTPHandler = async (
	req,
	res
) => {
	try {
		const tickets = await Ticket.find()
			.sort({ sold: 1 })
			.limit(1)
		res.status(200).send(tickets)
	} catch (error) {
		res.status(500).send("Internal Server Error")
	}
}



// UPDATE FIELD


export const setTicketsSold: HTTPHandler = async (
	req,
	res
) => {
	try {
		const ticket = await Ticket.findById(req.params.id)
		if (!ticket) throw new Error("404")
		ticket.sold = 12
		await ticket.save()
		res.status(200).send(ticket)
	} catch (error) {
		res.status(404).send("ticket Not Found")
	}
}



// READ ONE

export const getTicket: HTTPHandler = async (
	req,
	res
) => {
	try {
		const ticket = await Ticket.findById(req.params.id)
		res.status(200).send(ticket)
	} catch (error) {
		res.status(404).send("ticket Not Found")
	}
}


// UPDATE

export const putTicket: HTTPHandler = async (
	req,
	res
) => {
	try {
		const joke = await Ticket.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true, runValidators: true }
		)
		res.status(200).send(joke)
	} catch (error) {
		res.status(404).send("Ticket Not Found")
	}
}




// DESTROY

export const deleteTicket: HTTPHandler = async (
	req,
	res
) => {
	try {
		await Ticket.findByIdAndDelete(req.params.id)
		res.status(200).send()
	} catch (error) {
		res.status(404).send("Joke Not Found")
	}
}
