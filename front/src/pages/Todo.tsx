import React, { FC, memo, useEffect, useState } from "react";
import { Theme } from "@mui/material/styles";
import makeStyles from "@mui/styles/makeStyles";
import createStyles from "@mui/styles/createStyles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { ItemVO } from "../types/vo";
import ItemList from "../components/ItemList";
import ItemForm from "../components/ItemForm";
import { TodoStore } from "../stores/todo-store";
import { useSnackbar } from "notistack";
import { TODO_MAX_LIMIT } from "../types/const";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: () => ({}),
  })
);

type Props = Record<string, never>;

const Todo: FC<Props> = () => {
  const styles = useStyles();
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
        // return { ...i, content: i.content };
        return { ...i, content: content };
      }
      return i;
    });
    setItems(updatedList);
  };

  return (
    <Box p={2} className={styles.root}>
      <Grid container justifyContent="center" textAlign="center" spacing={2}>
        <Grid item sm={8} md={6} lg={4}>
          <Box my={2}>
            <ItemForm onAddItem={onAddItem} />
          </Box>
          <Box>
            <ItemList
              items={items}
              onCheckItem={onCheckItem}
              onDeleteItem={onDeleteItem}
              onUpdateItem={onUpdateItem}
              onContentStateTrack={onContentStateTrack}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default memo(Todo);
