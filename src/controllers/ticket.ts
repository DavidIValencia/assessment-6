import Ticket from "../models/Ticket";
import HTTPHandler from "../utils/HTTPHandler"

export const postTicket: HTTPHandler = async (req, res) => {
    try {
        const ticket = new Ticket(req.body);
        await ticket.save();
        res.status(201).send(ticket);
    } catch (err) {
        res.status(400).send("Bad request");
    }
};

export const getTickets: HTTPHandler = async (req, res) => {
    try {
      const query: { show?: string; sold?: { $gte: number } } = {};
  
      if (req.query.show) {
        query["show"] = req.query.show as string;
      }
      if (req.query["min-sold"]) {
        const minSold = Number(req.query["min-sold"]);
        if (!isNaN(minSold)) {
          query["sold"] = { $gte: minSold }; 
        } else {
          return res.status(400).send("'min-sold' must be a valid number.");
        }
      }
  
      const tickets = await Ticket.find(query);
  
      res.status(200).send(tickets);
    } catch (err) {
      res.status(500).send("Internal server error!");
    }
  };
  
  

export const getTicket: HTTPHandler = async (req, res) => {
    try {
      const ticket = await Ticket.findById(req.params.id);
      if (!ticket) {
        return res.status(404).send("Ticket not found!");
      }
      res.status(200).send(ticket);
    } catch (err) {
      res.status(500).send("Internal server error!");
    }
  };


export const putTicket: HTTPHandler = async (req, res) => {
    try {
      const ticket = await Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!ticket) {
        return res.status(404).send("Ticket not found!");
      }
      res.status(200).send(ticket);
    } catch (err) {
      res.status(500).send("Internal server error!");
    }
  };

export const deleteTicket: HTTPHandler = async (req, res) => {
    try {
      await Ticket.findByIdAndDelete(req.params.id);
      res.status(204).send();
    } catch (err) {
      res.status(404).send("Ticket not found!");
    }
  };

  export const getLeastSoldTicket: HTTPHandler = async (req, res) => {
    try {
      const ticket = await Ticket.findOne().sort({ sold: 1 });
      if (!ticket) {
        return res.status(404).send("No tickets found");
      }
      res.status(200).send(ticket);
    } catch (err) {
      res.status(500).send("Internal server error");
    }
  };

  
  
  
  

  
  