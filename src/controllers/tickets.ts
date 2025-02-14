import Ticket from "../models/Ticket"
import HTTPHandler from "../utils/HTTPHandler"
import { ObjectId } from "mongoose"

// READ MANY - GET ? queryParams

export const getTickets: HTTPHandler = async (req, res) => {
  try {
    const query: any = {}
    if (req.query.minSold) query.sold = { $gte: +req.query.minSold }

    if (req.query.includes !== undefined)
      query.show = { $regex: new RegExp(req.query.includes as string, "i") }

    const tickets = await (req.query.limit
      ? Ticket.find(query).limit(+req.query.limit)
      : Ticket.find(query))

    res.status(200).send(tickets)
  } catch (error) {
    res.status(500).send("Internal Server Error!")
  }
}

// READ ONE - GET w/ an id in params

export const getTicket: HTTPHandler = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id)
    res.status(200).send(ticket)
  } catch (error) {
    res.status(404).send("Ticket Not Found")
  }
}

// CREATE - POST w/ a body

export const postTicket: HTTPHandler = async (req, res) => {
  try {
    const ticket = new Ticket(req.body)
    await ticket.save()
    res.status(201).send(ticket)
  } catch (error) {
    res.status(400).send("Bad request!")
  }
}

// UPDATE WHOLE - PUT w/ id & a body (whole object)

export const putTicket: HTTPHandler = async (req, res) => {
  try {
    const ticket = await Ticket.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })
    res.status(200).send(ticket)
  } catch (error) {
    res.status(404).send("Ticket Not Found")
  }
}

//
// DESTROY - DELETE w/ id

export const deleteTicket: HTTPHandler = async (req, res) => {
  try {
    await Ticket.findByIdAndDelete(req.params.id)
    res.status(204).send()
  } catch (error) {
    res.status(404).send("Ticket Not Found")
  }
}

// UPDATE:  INC TICKETS SOLD - PATCH w/ id & a body (specific fields)

export const soldTickets: HTTPHandler = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id)
    const amountTickets = +req.body.amountSoldTickets
    if (!amountTickets) throw new Error("Bad Request")
    if (!ticket) throw new Error("Ticket Not Found")
    ticket.sold += amountTickets
    await ticket.save()
    res.status(200).send(ticket)
  } catch (error: any) {
    res.status(404).send(error.status)
  }
}

// GET LEAST SOLD
// DIDN'T FINISH CONSTRUCTING.........

export const getLeastTicketsSold: HTTPHandler = async (req, res) => {
  try {
    const lowest = await Ticket.findById(req.params.id).populate("lowest")
    if (!lowest) throw new Error("Lowest not found")
    res.status(200).send(lowest)
  } catch (error) {
    res.status(404).send("Lowest Not Found")
  }
}
