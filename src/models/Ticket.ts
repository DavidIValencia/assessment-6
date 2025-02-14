import { Schema, model } from "mongoose"

const TicketSchema = new Schema(
	{
        show: {
            type: String,
            required: true
        },
        section: {
            type: String,
            required: true
        },
        sold: {
            type: Number,
            required: true
        }


	},
	{ timestamps: true }
)

const Ticket = model("Ticket", TicketSchema)
export default Ticket