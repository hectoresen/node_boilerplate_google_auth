import { UserEntity } from "../entities/user.entity";

export class UserModel {
    id!: string;
    firstName!: string;
    lastName!: string;
    email!: string;
    createdAt!: Date;
    updatedAt!: Date;

    constructor (
        id: string,
        firstName: string,
        lastName: string,
        email: string,
        createdAt: Date,
        updatedAt: Date
    ) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    };

    static fromEntity (entity: UserEntity): UserModel {
        const { id, firstName, lastName, email, createdAt, updatedAt } = entity;

        return new UserModel(
            id,
            firstName,
            lastName,
            email,
            createdAt,
            updatedAt
        )
    };
}