// src/middlewares/entityType.ts
import { Request, Response, NextFunction } from 'express';

export const setEntity = (entityType: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
        req.entityType = entityType;
        next();
    };
};
