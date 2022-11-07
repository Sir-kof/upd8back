import { Request, Response, NextFunction } from 'express'

export const cors = (req: Request, res: Response, next: NextFunction): void => {
  res.set('access-control-alloww-origin', '*')
  res.set('access-control-alloww-methods', '*')
  res.set('access-control-alloww-headers', '*')
  next()
}
