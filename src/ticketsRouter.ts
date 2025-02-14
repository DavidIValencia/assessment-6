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

// GET /tickets

router.get("/", async (req, res) => {
    try {
      const { show, "min-sold": minSold } = req.query;
      let filter: any = {};
  
      if (show) filter.show = show;
      if (minSold) filter.sold = { $gte: Number(minSold) };
  
      const tickets = await Ticket.find(filter);
      res.status(200).json(tickets);
    } catch (err) {
      res.status(500).json({ error: "Server error" });
    }
});
  
// GET /tickets/find/:id - Find ticket by ID

router.get("/find/:id", async (req, res) => {
    try {
      const ticket = await Ticket.findById(req.params.id);
      if (!ticket) return res.status(404).send("Ticket not found");
      res.status(200).json(ticket);
    } catch (err) {
      res.status(500).json({ error: "Invalid ID format" });
    }
});
  
// POST /tickets - Add a new ticket

router.post("/", async (req, res) => {
    try {
      const newTicket = new Ticket(req.body);
      await newTicket.save();
      res.status(201).json(newTicket);
    } catch (err) {
      res.status(400).json({ error: "Invalid ticket data" });
    }
});

// PUT /tickets/:id - Update a ticket by ID
router.put("/:id", async (req, res) => {
    try {
      const updatedTicket = await Ticket.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedTicket) return res.status(404).send("Ticket not found");
      res.status(200).json(updatedTicket);
    } catch (err) {
      res.status(500).json({ error: "Invalid ID format" });
    }
});

export default router;