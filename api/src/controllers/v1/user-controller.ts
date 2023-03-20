import {
  Controller,
  Route,
  Post,
  Body,
  Get,
  Path,
  Tags,
  SuccessResponse,
} from "tsoa";
import { getCustomRepository } from "typeorm";
import { User } from "../../entities/user";
import { provideSingleton, inject } from "../../middlewares/inversify/ioc-util";
import { UserRepository } from "../../repositories/user-repository";
import { UserService } from "../../services/user-service";

@Route("users")
@Tags("user")
@provideSingleton(UserController)
export class UserController extends Controller {
  // private userService: UserService;
  private userRepository = getCustomRepository(UserRepository);
  @inject(UserService) private userService: UserService;

  constructor() {
    super();
    // console.log("UserController constructor"); OK
    this.userService = new UserService();
  }

  // @Post()
  // @SuccessResponse(200, "Create User")
  // async createUser(@Body() requestBody: User): Promise<User> {
  //   return this.userRepository.save(requestBody);
  // }
  @Post()
  @SuccessResponse(200, "Create User")
  async createUser(@Body() requestBody: User): Promise<User> {
    return this.userService.createUser(requestBody);
  }
}
