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
} from "tsoa";
import { User } from "../../entities/user";
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
    return this.userService.getUserById(id);
  }

  @Post()
  public async createUser(@Body() user: Partial<User>): Promise<User> {
    return this.userService.createUser(user);
  }

  @Put("{id}")
  public async updateUser(
    @Path() id: number,
    @Body() user: Partial<User>
  ): Promise<User> {
    return this.userService.updateUser(id, user);
  }

  @Delete("{id}")
  public async deleteUser(@Path() id: number): Promise<void> {
    return this.userService.deleteUser(id);
  }
}
