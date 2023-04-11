import React, { FC, memo, useEffect, useState } from "react";
import { ItemVO } from "../types/vo";
import ItemList from "../components/ItemList";
import ItemForm from "../components/ItemForm";
import { TodoStore } from "../stores/todo-store";
import { useSnackbar } from "notistack";
import { TODO_MAX_LIMIT } from "../types/const";

type Props = Record<string, never>;

const Todo: FC<Props> = () => {
  const { enqueueSnackbar } = useSnackbar();
  const todoStore = TodoStore.useContainer();

  const [items, setItems] = useState<ItemVO[]>([]);

  useEffect(() => {
    todoStore.loadItems().then((data) => setItems(data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onAddItem = async (itemContent: string) => {
    const count = await todoStore.countItem();
    if (count >= TODO_MAX_LIMIT) {
      enqueueSnackbar("追加できるTODOは最大10件です");
      return;
    }
    const item = await todoStore.createItem({
      content: itemContent,
      isDone: false,
    });
    if (item) {
      setItems([...items, item]);
    } else {
      enqueueSnackbar("TODOの追加に失敗しました");
    }
  };

  const onCheckItem = async (id: string, isDone: boolean) => {
    const item = await todoStore.updateItem(id, { isDone });
    if (item) {
      const updatedList = items.map((i) => {
        if (i.id === id) {
          return { ...i, isDone: !i.isDone };
        }
        return i;
      });
      setItems(updatedList);
    } else {
      enqueueSnackbar("TODOの更新に失敗しました");
    }
  };

  const onUpdateItem = async (id: string, content: string) => {
    const item = await todoStore.updateItem(id, { content });
    if (item) {
      const updatedList = items.map((i) => {
        if (i.id === id) {
          return { ...i, content: i.content };
        }
        return i;
      });
      setItems(updatedList);
    } else {
      enqueueSnackbar("TODOの更新に失敗しました");
    }
  };

  const onDeleteItem = async (id: string) => {
    const succeeded = await todoStore.deleteItem(id);
    if (succeeded) {
      setItems(items.filter((i) => i.id !== id));
    } else {
      enqueueSnackbar("TODOの削除に失敗しました");
    }
  };

  const onContentStateTrack = async (id: string, content: string) => {
    const updatedList = items.map((i) => {
      if (i.id === id) {
        return { ...i, content: content };
      }
      return i;
    });
    setItems(updatedList);
  };

  return (
    <div className="p-2 bg-gray-100">
      <div className="grid justify-center gap-2 text-center">
        <div className="sm:w-8/12 md:w-6/12 lg:w-4/12 ">
          <div className="my-2">
            <ItemForm onAddItem={onAddItem} />
          </div>
          <div>
            <ItemList
              items={items}
              onCheckItem={onCheckItem}
              onDeleteItem={onDeleteItem}
              onUpdateItem={onUpdateItem}
              onContentStateTrack={onContentStateTrack}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Todo);
