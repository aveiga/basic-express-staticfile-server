import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Guitar {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    model: string;

    @Column()
    brand: string;
}