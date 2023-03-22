import {
  Controller,
  Route,
  Post,
  Body,
  Get,
  Path,
  Tags,
  SuccessResponse,
  Put,
  Delete,
  Query,
} from "tsoa";
import { User } from "../../entities/user";
import { ClientError } from "../../middlewares/client-error";
import { provideSingleton, inject } from "../../middlewares/inversify/ioc-util";
import { UserService } from "../../services/user-service";

@Route("users")
@Tags("user")
@provideSingleton(UserController)
export class UserController extends Controller {
  @inject(UserService) private userService: UserService;

  constructor() {
    super();
    this.userService = new UserService();
  }

  @Get()
  public async getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Get("{id}")
  public async getUserById(@Path() id: number): Promise<User> {
    if (isNaN(id) || id < 1) {
      throw new Error("Invalid ID");
    }
    return this.userService.getUserById(id);
  }

  @Post()
  public async createUser(@Body() user: Partial<User>): Promise<User> {
    if (!user) {
      throw new Error("Invalid user");
    }
    return this.userService.createUser(user);
  }

  @Put("{id}")
  public async updateUser(
    @Path() id: number,
    @Body() user: Partial<User>
  ): Promise<User> {
    if (isNaN(id) || id < 1) {
      throw new Error("Invalid ID");
    }
    if (!user) {
      throw new Error("Invalid user");
    }
    return this.userService.updateUser(id, user);
  }

  @Delete("{id}")
  public async deleteUser(@Path() id: number): Promise<void> {
    if (isNaN(id) || id < 1) {
      throw new ClientError(404, "Invalid ID");
    }
    return this.userService.deleteUser(id);
  }
}
