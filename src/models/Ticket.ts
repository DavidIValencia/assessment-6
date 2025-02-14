import { Schema, model } from "mongoose"

const TicketSchema = new Schema(
	{
        show: {
            type: String
        },
        section: {
            type: String
        },
        sold: {
            type: Number
        }
	},
)

const Ticket = model("Ticket", TicketSchema)
export default Ticket