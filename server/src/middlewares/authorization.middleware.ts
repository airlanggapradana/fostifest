import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';

export function decodeJwtWithoutVerify(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({message: 'No token provided'});
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.decode(token);
    if (!decoded) {
      return res.status(400).json({message: 'Invalid token'});
    }
    // Attach decoded payload to req.user
    (req as any).user = decoded;
    next();
  } catch (err) {
    return res.status(400).json({message: 'Token decode error'});
  }
}