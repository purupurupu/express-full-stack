import { User } from "../entities/user";
import { UserRepository } from "../repositories/user-repository";
import { provideSingleton } from "../middlewares/inversify/ioc-util";
import { getCustomRepository } from "typeorm";

@provideSingleton(UserService)
export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = getCustomRepository(UserRepository);
  }

  async createUser(user: User): Promise<User> {
    return this.userRepository.save(user);
  }
}
