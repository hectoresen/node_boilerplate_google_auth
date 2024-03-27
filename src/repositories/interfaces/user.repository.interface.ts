import NotFoundException from "../../common/exceptions/not-found-exception";
import { UserEntity } from "../../entities/user.entity";
import { UserModel } from "../../models/user.model";

export default interface UserRepositoryInterface {
    findUserById(id: string): Promise<UserModel | NotFoundException>
    findUserByEmail(email: string): Promise<UserModel | NotFoundException>
    createUser(createUserDto: Partial<UserEntity>): Promise<UserModel>
    editUser(id: string, updateUserDto: Partial<UserEntity>): Promise<UserModel | NotFoundException>
}