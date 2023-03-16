import {
  Controller,
  Get,
  Route,
  SuccessResponse,
  // Request,
  Post,
  Body,
  Put,
  Delete,
  Tags,
} from "tsoa";
import { ItemService } from "../../services/item-service";
import { provideSingleton, inject } from "../../middlewares/inversify/ioc-util";
import { ItemVO } from "../../types/vo";
import { ItemCreateParams, ItemUpdateParams } from "../../types/request";
import { getCustomRepository } from "typeorm";
import { ItemRepository } from "../../repositories/item-repository";

@Route("items")
@Tags("Item")
@provideSingleton(ItemController)
export class ItemController extends Controller {
  private itemRepository = getCustomRepository(ItemRepository);
  @inject(ItemService) private itemService: ItemService;

  /**
   * @returns {Promise<ItemVO[]>} Return Items
   */
  @Get()
  @SuccessResponse(200, "Return Items")
  public get(): Promise<ItemVO[]> {
    return this.itemService.findItems();
  }

  @Get("count")
  @SuccessResponse(200, "Return Item Count")
  public count(): Promise<number> {
    return this.itemRepository.count();
  }

  @Get("{id}")
  @SuccessResponse(200, "Return Item")
  public find(id: string): Promise<ItemVO> {
    return this.itemService.findItem(id);
  }

  @Post()
  @SuccessResponse(200, "Return Item")
  public post(@Body() params: ItemCreateParams): Promise<ItemVO> {
    return this.itemService.createItem(params);
  }

  @Put("{id}")
  @SuccessResponse(200, "Return Item")
  public put(id: string, @Body() params: ItemUpdateParams): Promise<ItemVO> {
    return this.itemService.updateItem(id, params);
  }

  @Delete("{id}")
  @SuccessResponse(204, "Succeeded")
  public async delete(id: string): Promise<void> {
    await this.itemRepository.delete(id);
  }
}
