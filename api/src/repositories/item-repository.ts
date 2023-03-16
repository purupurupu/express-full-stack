import { EntityRepository, Repository } from "typeorm";
import { ItemDto } from "../dtos/item-dto";
import { Item } from "../entities/item";
import { ClientError } from "../middlewares/client-error";

@EntityRepository(Item)
export class ItemRepository extends Repository<Item> {
  async findByIdOrFail(id: string): Promise<ItemDto> {
    const query = this.createQueryBuilder("items").where("items.id = :id", {
      id,
    });
    try {
      return ItemDto.fromEntity(await query.getOneOrFail());
    } catch (error) {
      throw new ClientError(404, "item not found");
    }
  }

  async findLastByOrderDesc(): Promise<ItemDto | undefined> {
    const entity = await this.createQueryBuilder("items")
      .orderBy("items.order", "DESC")
      .getOne();
    if (!entity) return undefined;
    return ItemDto.fromEntity(entity);
  }

  async findAllItemsOrderByAsc(): Promise<ItemDto[]> {
    const entities = await this.createQueryBuilder("items")
      .orderBy("items.order", "ASC")
      .getMany();
    return entities.map((e) => ItemDto.fromEntity(e));
  }
}
