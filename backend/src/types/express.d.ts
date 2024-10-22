// src/types/express.d.ts

import { Request } from 'express';

// Extend the Express namespace to include the custom property
declare global {
    namespace Express {
        interface Request {
            entityType?: string;
        }
    }
}
