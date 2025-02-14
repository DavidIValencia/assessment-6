import { query } from "express"
import Ticket from "../models/Ticket"
import HTTPHandler from "../utils/HTTPHandler"

export const getTickets: HTTPHandler = async (
    req,
    res
) => {
    try{
        const query: any = {}
        if (req.query["show"] !== undefined){
            query.show = new RegExp(
                req.query["show"] as string
            )
        }
        if (req.query["min-sold"] !== undefined){
            query.sold = {$gte: req.query["min-sold"]}
        }
        const tickets = await Ticket.find(query)
        res.status(200).send(tickets)
    } catch (error) {
        res.status(500).send("Server Error")
    }
}

export const getTicket: HTTPHandler = async (
    req,
    res
) => {
    try{
        const ticket = await Ticket.findById(req.params.id)
        res.status(200).send(ticket)
    } catch (error) {
        res.status(404).send("Ticket not found")
    }
}

export const postTicket: HTTPHandler = async (
    req,
    res
) => {
    try{
        const ticket = new Ticket(req.body)
        await ticket.save()
        res.status(201).send(ticket)
    } catch (error) {
        res.status(400).send("Ticket not found")
    }
}

export const putTicket: HTTPHandler = async (
    req,
    res
) => {
    try{
        const ticket = await Ticket.findByIdAndUpdate(
            req.params._id,
            req.body,
            { new: true, runValidators: true }
        )
        res.status(200).send(ticket)
    } catch (error) {
        res.status(404).send("Ticket not found")
    }
}

export const deleteTicket: HTTPHandler = async (
    req,
    res
) => {
    try{
        await Ticket.findByIdAndDelete(req.params.id)
        res.status(204).send()
    } catch (error) {
        res.status(404).send("Ticket not found")
    }
}

export const patchTicket: HTTPHandler = async (
    req,
    res
) => {
    try{
        const ticket = await Ticket.findById(req.params._id)
        if (!ticket) throw new Error("404")
            ticket.sold = req.body
        res.status(200).send(ticket)
    } catch (error) {
        res.status(404).send("Ticket not found")
    }
}

export const getLeastSold: HTTPHandler = async (
    req,
    res
) => {
    try{
        const tickets = await Ticket.find()
        res.status(200).send(tickets)
    } catch (error) {
        res.status(404).send("Ticket not found")
    }
}