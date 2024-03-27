import { Entity, Column } from "typeorm";
import { AbstractEntity } from "../common/abstract.entity";

@Entity({ name: 'user' })
export class UserEntity extends AbstractEntity {
    @Column()
    firstName!: string;

    @Column({ nullable: true })
    lastName!: string

    @Column()
    email!: string;
}