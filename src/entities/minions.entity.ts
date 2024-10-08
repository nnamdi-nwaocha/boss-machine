import {
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Work } from "./work.entity";
@Entity({ name: "minion" })
export class Minion {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column()
    title: string;

    @Column()
    salary: number;

    @OneToMany(() => Work, (work) => work.minion)
    work: Work[];
}