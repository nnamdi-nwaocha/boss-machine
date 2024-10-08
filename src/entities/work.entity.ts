import {
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Minion } from "./minions.entity";
@Entity({ name: "work" })
export class Work {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    hours: number;

    @ManyToOne(() => Minion, (minion) => minion.work)
    minion: Minion;
}