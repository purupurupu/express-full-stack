import { User } from "../entities/user";
import { UserRepository } from "../repositories/user-repository";
import { provideSingleton } from "../middlewares/inversify/ioc-util";
import { getCustomRepository } from "typeorm";
import { ClientError } from "../middlewares/client-error";

@provideSingleton(UserService)
export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = getCustomRepository(UserRepository);
  }

  async getAllUsers(): Promise<User[]> {
    const users = await this.userRepository.find();
    if (!users) {
      throw new ClientError(404, `Users not found`);
    }
    return users;
  }

  async getUserById(id: number): Promise<User> {
    return await this.userRepository.findOneOrFail(id);
  }

  async createUser(user: Partial<User>): Promise<User> {
    const newUser = await this.userRepository.save(user);

    if (!newUser) {
      throw new ClientError(
        500,
        "User creation failed. Please try again later."
      );
    }

    return newUser;
  }

  async updateUser(id: number, user: Partial<User>): Promise<User> {
    try {
      const userToUpdate = await this.userRepository.findOneOrFail(id);
      const updatedUser = Object.assign(userToUpdate, user);
      await this.userRepository.save(updatedUser);
      return updatedUser;
    } catch (error) {
      throw new ClientError(404, "User not found");
    }
  }

  async deleteUser(id: number): Promise<void> {
    try {
      const user = await this.userRepository.findOneOrFail(id);
      await this.userRepository.remove(user);
    } catch (error) {
      throw new ClientError(404, "User not found");
    }
  }
}
