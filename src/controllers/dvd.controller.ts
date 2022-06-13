import { Request, Response } from 'express'
import { dvdService } from '../services'

class DvdController {
  registerDvds = async (req: Request, res: Response) => {
    const dvds = await dvdService.registerDvds(req)

    return res.status(201).json({ dvds })
  }

  getAllDvds = async (_: Request, res: Response) => {
    const dvds = await dvdService.getAllDvds()

    return res.status(200).json({ dvds })
  }
}

export default new DvdController()
