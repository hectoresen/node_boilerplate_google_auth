import { Repository } from "typeorm";

import { AppDataSource } from "../../config/datasource";
import { UserEntity } from "../entities/user.entity";
import NotFoundException from "../common/exceptions/not-found-exception";
import { UserModel } from "../models/user.model";
import UserRepositoryInterface from "./interfaces/user.repository.interface";

export class UserRepository implements UserRepositoryInterface{
  private userRepository: Repository<UserEntity>;

  constructor() {
    this.userRepository = AppDataSource.getRepository(UserEntity);
  };

  async findUserById(id: string): Promise<UserModel | NotFoundException> {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
        throw new NotFoundException(`User with id: ${id} not found`)
    }
    return UserModel.fromEntity(user)
  };

  async findUserByEmail(email: string): Promise<UserModel | NotFoundException> {
    const user = await this.userRepository.findOneBy({ email });

    if (!user) {
        throw new NotFoundException(`User with id: ${email} not found`)
    }
    return UserModel.fromEntity(user)
  };

  async createUser(createUserDto: Partial<UserEntity>): Promise<UserModel> {
    const newUser = this.userRepository.create(createUserDto);
    
    await this.userRepository.save(newUser);
    
    return UserModel.fromEntity(newUser);
  }

  async editUser(id: string, updateUserDto: Partial<UserEntity>): Promise<UserEntity | NotFoundException> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with id: ${id} not found`)
    };

    const updatedUser = this.userRepository.merge(user, updateUserDto);
    return this.userRepository.save(updatedUser);
  };

}
