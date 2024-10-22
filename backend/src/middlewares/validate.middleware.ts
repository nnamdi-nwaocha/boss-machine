// middleware/validate.ts
import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';

export const validate = (schema: ObjectSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.body, { abortEarly: false });

        if (error) {
            const validationErrors = error.details.map(detail => detail.message);
            res.status(400).json({ errors: validationErrors });
        }

        next();
    };
};
