import { Request, Response } from "express"

export default interface HTTPHandler {
	(req: Request, res: Response): void
}
