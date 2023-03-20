import { EntityRepository, Repository } from "typeorm";
import { User } from "../entities/user";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async findOne(id: number): Promise<User | null> {
    const user = await super.findOne(id);
    return user ? user : null;
  }
}
