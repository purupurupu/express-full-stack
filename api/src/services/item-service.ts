import { getCustomRepository } from "typeorm";
import { ItemDto } from "../dtos/item-dto";
import { provideSingleton } from "../middlewares/inversify/ioc-util";
import { ItemRepository } from "../repositories/item-repository";
import { ItemCreateParams, ItemUpdateParams } from "../types/request";
import { ItemVO } from "../types/vo";
import { v4 as uuid } from "uuid";
import {
  ClientError,
  ClientErrorStatusCodes,
} from "../middlewares/client-error";

@provideSingleton(ItemService)
export class ItemService {
  private itemRepository: ItemRepository;

  constructor() {
    this.itemRepository = getCustomRepository(ItemRepository);
  }

  async findItems(): Promise<ItemVO[]> {
    const dtos = await this.itemRepository.findAllItemsOrderByAsc();
    return dtos.map((dto) => dto.toVO());
  }

  async findItem(id: string): Promise<ItemVO> {
    const dto = await this.itemRepository.findByIdOrFail(id);
    return dto.toVO();
  }

  async createItem(params: ItemCreateParams): Promise<ItemVO> {
    const listUpperLimit = 10;
    if ((await this.itemRepository.count()) >= listUpperLimit) {
      throw new ClientError(
        ClientErrorStatusCodes.UNPROCESSABLE_ENTITY,
        `Todo count is up to ${listUpperLimit}.`
      );
    }
    const lastOrder = await this.itemRepository.findLastByOrderDesc();
    const order = lastOrder ? lastOrder.order + 1 : 1;
    const dto = new ItemDto(uuid(), order, params.content, params.isDone);
    await this.itemRepository.save(dto.toEntity());
    return dto.toVO();
  }

  async updateItem(id: string, params: ItemUpdateParams): Promise<ItemVO> {
    const dto = await this.itemRepository.findByIdOrFail(id);
    Object.assign(dto, params);
    await this.itemRepository.save(dto);
    return dto.toVO();
  }
}
