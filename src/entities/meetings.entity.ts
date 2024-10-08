import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
} from "typeorm";
@Entity({ name: "meetings" })
export class Meeting {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    date: Date;

    @Column()
    time: string;

    @Column()
    note: string;
}