// routes/apiRoutes.ts
import * as express from "express";
import { setEntity } from '../middlewares/entityType';
import {
    getAll,
    getById,
    createEntity,
    updateEntity,
    deleteEntity,
    deleteAll
} from '../controllers/crud.controller'
import { validate } from "../middlewares/validate.middleware";
import { createIdeaSchema, createMeetingSchema, createMinionSchema, updateIdeaSchema, updateMinionSchema } from "../validation/schemas";

const minionsRouter = express.Router();

// Minions routes
minionsRouter.get('/', setEntity('Minion'), getAll);
minionsRouter.post('/', setEntity('Minion'), validate(createMinionSchema), createEntity);
minionsRouter.get('/:id', setEntity('Minion'), getById);
minionsRouter.put('/:id', setEntity('Minion'), validate(updateMinionSchema), updateEntity);
minionsRouter.delete('/:id', setEntity('Minion'), deleteEntity);

const ideasRouter = express.Router();

// Ideas routes
ideasRouter.get('/', setEntity('Idea'), getAll);
ideasRouter.post('/', setEntity('Idea'), validate(createIdeaSchema), createEntity);
ideasRouter.get('/:id', setEntity('Idea'), getById);
ideasRouter.put('/:id', setEntity('Idea'), validate(updateIdeaSchema), updateEntity);
ideasRouter.delete('/:id', setEntity('Idea'), deleteEntity);

const meetingsRouter = express.Router();

// Meetings routes
meetingsRouter.get('/', setEntity('Meeting'), getAll);
meetingsRouter.post('/', setEntity('Meeting'), validate(createMeetingSchema), createEntity);
meetingsRouter.delete('/', setEntity('Meeting'), deleteAll);

export { minionsRouter, ideasRouter, meetingsRouter }
