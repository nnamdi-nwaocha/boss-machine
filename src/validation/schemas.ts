// validation/schemas.ts
const Joi = require('joi');

// Minion Schemas
export const createMinionSchema = Joi.object({
    name: Joi.string().required(),
    title: Joi.string().required(),
    salary: Joi.number().required()
});

export const updateMinionSchema = Joi.object({
    name: Joi.string().optional(),
    title: Joi.string().optional(),
    salary: Joi.number().optional()
}).or('name', 'title', 'salary');

// Idea Schemas
export const createIdeaSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    numWeeks: Joi.number().required(),
    weeklyRevenue: Joi.number().required()
});

export const updateIdeaSchema = Joi.object({
    name: Joi.string().optional(),
    description: Joi.string().optional(),
    numWeeks: Joi.number().optional(),
    weeklyRevenue: Joi.number().optional()
}).or('name', 'description', 'numWeeks', 'weeklyRevenue'); // At least one field must be present


// Meeting Schemas
export const createMeetingSchema = Joi.object({
    time: Joi.string().required(),
    date: Joi.date().required(),
    day: Joi.string().required(),
    note: Joi.string().optional()
});


