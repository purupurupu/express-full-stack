import { ItemVO } from "../types/vo";
import { Item } from "../entities/item";

export class ItemDto {
  id: string;
  order: number;
  content: string;
  isDone: boolean;

  constructor(id: string, order: number, content: string, isDone: boolean) {
    this.id = id;
    this.order = order;
    this.content = content;
    this.isDone = isDone;
  }

  toEntity = (): Item => {
    const entity = new Item(this.id, this.order, this.content, this.isDone);
    entity.id = this.id;
    entity.order = this.order;
    entity.content = this.content;
    entity.isDone = this.isDone;
    return entity;
  };

  static fromEntity = (entity: Item): ItemDto =>
    new ItemDto(entity.id, entity.order, entity.content, entity.isDone);

  toVO = (): ItemVO => {
    return {
      id: this.id,
      order: this.order,
      content: this.content,
      isDone: this.isDone,
    };
  };
}
