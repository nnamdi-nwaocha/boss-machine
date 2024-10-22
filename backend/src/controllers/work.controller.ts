import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../data-source';
import { AppError } from '../types';
import { Minion } from '../entities/minions.entity';
import { Work } from '../entities/work.entity';

async function getMinion(id: string) {
    const minionRepository = AppDataSource.getRepository(Minion);
    console.log("[getById] Fetching entity by ID...");
    const minion = await minionRepository.findOne({
        where: { id: id },
        relations: {
            work: true
        }
    });
    if (!minion) {
        console.log("[getById] Entity not found.");
        throw new AppError('Entity not found', 404)
    }
    return minion
}

async function updateMinion(id: string, minion: Minion) {
    const foundMinion = await getMinion(id);
    const updatedMinion = Object.assign(foundMinion, minion);
    const minionRepository = AppDataSource.getRepository(Minion);
    console.log("[update] Updating entity...");
    return await minionRepository.save(updatedMinion)
}

export const addWork = async (req: Request, res: Response, next: NextFunction) => {
    console.log(`[addwork] entityType: ${req.entityType}, id: ${req.params.id}, body:`, req.body);
    try {
        const workRepository = AppDataSource.getRepository(Work);

        // Create and save the new work entity
        const newWork = workRepository.create({
            title: req.body.title,
            description: req.body.description,
            hours: req.body.hours,
            minion: { id: req.params.id } // Associate with the minion directly
        });
        console.log("[addwork] Created new entity:", newWork);

        const savedWork = await workRepository.save(newWork);
        console.log("[addwork] Saved entity:", savedWork);

        // Retrieve the minion by ID
        const minion = await getMinion(req.params.id);
        console.log("[getById] Retrieved entity:", minion);

        // Associate the saved work with the minion
        minion.work.push(savedWork);

        // Update the minion with the newly added work
        const updatedMinion = await updateMinion(req.params.id, minion);
        console.log("[addwork] Updated minion:", updatedMinion);

        res.status(201).json(savedWork);
    } catch (error) {
        console.error("[addwork] Error:", error);
        next(error);
    }
};



export const getAllWork = async (req: Request, res: Response, next: NextFunction) => {
    console.log("[getAllWork] Fetching all work...");
    try {
        const minion = await getMinion(req.params.id)
        res.status(200).json(minion.work)
    } catch (error) {
        console.error("[addwork] Error:", error);
        next(error);
    }
}

export const updateWork = async (req: Request, res: Response, next: NextFunction) => {
    console.log(`[updateWork] minionId: ${req.params.id}, workID: ${req.params.workId}`);

    try {
        const minion = await getMinion(req.params.id);
        console.log(`[updateWork] Found minion:`, minion);

        const workRepository = AppDataSource.getRepository(Work);
        const work = await workRepository.findOne({
            where: { id: req.params.workId, minion: { id: minion.id } },
        });

        if (!work) {
            console.log("[updateWork] Work not found.");
            throw new AppError('Entity not found', 404)
        }

        Object.assign(work, req.body);
        console.log("[updateWork] Updating work:", work);

        const savedWork = await workRepository.save(work);
        console.log("[updateWork] Work updated and saved:", savedWork);

        res.status(200).json(savedWork);
    } catch (error) {
        console.error("[updateWork] Error:", error);
        next(error);
    }
};

export const deleteWork = async (req: Request, res: Response, next: NextFunction) => {
    console.log(`[deleteWork] minionId: ${req.params.id}, workId: ${req.params.workId}`);

    try {
        // Fetch the Minion
        const minion = await getMinion(req.params.id);
        console.log("[deleteWork] Retrieved minion:", minion);

        // Fetch the Work to delete
        const workRepository = AppDataSource.getRepository(Work);
        const work = await workRepository.findOne({
            where: { id: req.params.workId, minion: { id: req.params.id } } // Ensure work belongs to the correct minion
        });

        if (!work) {
            console.log("[deleteWork] Work not found.");
            throw new AppError("Work not found", 404);
        }

        // Remove the work from the minion's work array
        minion.work = minion.work.filter(w => w.id !== work.id);
        console.log("[deleteWork] Work removed from minion's work array");

        // Delete the work from the database
        await workRepository.remove(work);
        console.log("[deleteWork] Work deleted from the database:", work);

        // Update the minion to reflect the removal
        const updatedMinion = await updateMinion(req.params.id, minion);
        console.log("[deleteWork] Updated minion:", updatedMinion);

        res.status(200).json({
            message: 'Work deleted successfully',
            updatedMinion
        });
    } catch (error) {
        console.error("[deleteWork] Error:", error);
        next(error);
    }
};

export const deleteAllWork = async (req: Request, res: Response, next: NextFunction) => {
    console.log(`[deleteAllWork] minionId: ${req.params.id}`);

    try {
        // Fetch the Minion
        const minion = await getMinion(req.params.id);
        console.log("[deleteAllWork] Retrieved minion:", minion);

        // Fetch all Work associated with the minion
        const workRepository = AppDataSource.getRepository(Work);
        const works = await workRepository.find({
            where: { minion: { id: minion.id } },
        });

        if (works.length === 0) {
            console.log('No found work')
            next()
        }

        // Delete all work entries
        await workRepository.remove(works);
        console.log("[deleteAllWork] Deleted all work associated with the minion.");

    } catch (error) {
        console.error("[deleteAllWork] Error:", error);
        next(error);
    }
};
