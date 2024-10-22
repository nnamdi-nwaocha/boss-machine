// controllers/crudController.ts
import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../data-source';
import { AppError } from '../types';

export const getAll = async (req: Request, res: Response, next: NextFunction) => {
    console.log(`[getAll] entityType: ${req.entityType}`);
    try {
        const repository = AppDataSource.getRepository(req.entityType);
        console.log("[getAll] Fetching all entities...");
        const entities = await repository.find();
        console.log("[getAll] Retrieved entities:", entities);
        res.status(200).json(entities);
    } catch (error) {
        console.error("[getAll] Error:", error);
        next(error);
    }
};

export const getById = async (req: Request, res: Response, next: NextFunction) => {
    console.log(`[getById] entityType: ${req.entityType}, id: ${req.params.id}`);
    try {
        const repository = AppDataSource.getRepository(req.entityType);
        console.log("[getById] Fetching entity by ID...");
        const entity = await repository.findOne({
            where: { id: req.params.id }
        });
        if (!entity) {
            console.log("[getById] Entity not found.");
            next(new AppError('Entity not found', 404));
        }
        console.log("[getById] Retrieved entity:", entity);
        res.status(200).json(entity);
    } catch (error) {
        console.error("[getById] Error:", error);
        next(error);
    }
};

export const createEntity = async (req: Request, res: Response, next: NextFunction) => {
    console.log(`[createEntity] entityType: ${req.entityType}, body:`, req.body);
    try {
        const repository = AppDataSource.getRepository(req.entityType);
        const newEntity = repository.create(req.body);
        console.log("[createEntity] Created new entity:", newEntity);
        const savedEntity = await repository.save(newEntity);
        console.log("[createEntity] Saved entity:", savedEntity);
        res.status(201).json(savedEntity);
    } catch (error) {
        console.error("[createEntity] Error:", error);
        next(error);
    }
};

export const updateEntity = async (req: Request, res: Response, next: NextFunction) => {
    console.log(`[updateEntity] entityType: ${req.entityType}, id: ${req.params.id}, body:`, req.body);
    try {
        const repository = AppDataSource.getRepository(req.entityType);
        console.log("[updateEntity] Fetching entity by ID...");
        const entity = await repository.findOne({
            where: { id: req.params.id }
        });
        if (!entity) {
            console.log("[updateEntity] Entity not found.");
            next(new AppError('Entity not found', 404));
        }
        console.log("[updateEntity] Original entity:", entity);
        Object.assign(entity, req.body);
        console.log("[updateEntity] Updated entity with new data:", entity);
        const updatedEntity = await repository.save(entity);
        console.log("[updateEntity] Saved updated entity:", updatedEntity);
        res.status(200).json(updatedEntity);
    } catch (error) {
        console.error("[updateEntity] Error:", error);
        next(error);
    }
};

export const deleteEntity = async (req: Request, res: Response, next: NextFunction) => {
    console.log(`[deleteEntity] entityType: ${req.entityType}, id: ${req.params.id}`);
    try {
        const repository = AppDataSource.getRepository(req.entityType);
        console.log("[deleteEntity] Deleting entity by ID...");
        const result = await repository.delete(req.params.id);
        if (result.affected === 0) {
            console.log("[deleteEntity] Entity not found.");
            next(new AppError('Entity not found', 404));
        }
        console.log("[deleteEntity] Entity deleted successfully.");
        res.status(200).json({ message: 'Entity deleted successfully' });
    } catch (error) {
        console.error("[deleteEntity] Error:", error);
        next(error);
    }
};

export const deleteAll = async (req: Request, res: Response, next: NextFunction) => {
    console.log(`[deleteAll] entityType: ${req.entityType}`);
    try {
        const repository = AppDataSource.getRepository(req.entityType);
        console.log("[deleteAll] Deleting all entities...");
        await repository.clear();
        console.log("[deleteAll] All entities deleted successfully.");
        res.status(200).json({ message: 'All entities deleted successfully' });
    } catch (error) {
        console.error("[deleteAll] Error:", error);
        next(error);
    }
};
