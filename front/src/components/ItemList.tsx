import React, { memo, useState } from "react";
import makeStyles from "@mui/styles/makeStyles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";

import { ItemVO } from "../types/vo";
import { Theme } from "@mui/material/styles";
import { FC } from "react";
import TextField from "@mui/material/TextField";
import { Card } from "@mui/material";

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  card: { mb: 2 },
  completed: {
    color: "#808080",
  },
}));

type Props = {
  items: ItemVO[];
  onCheckItem: (id: string, isDone: boolean) => Promise<void>;
  onDeleteItem: (id: string) => Promise<void>;
  onUpdateItem: (id: string, content: string) => Promise<void>;
  onContentStateTrack: (id: string, content: string) => Promise<void>;
};

const ItemList: FC<Props> = ({
  items,
  onCheckItem,
  onDeleteItem,
  onUpdateItem,
  onContentStateTrack,
}) => {
  const styles = useStyles();

  const [editItemId, setEditItemId] = useState<string | null>(null);
  const [beforeEdit, setBeforeEdit] = useState<string | null>(null);

  const onClickEdit = (ItemVO: ItemVO, isEditing: boolean): void => {
    if (ItemVO.id === editItemId) {
      setEditItemId(null);
    } else {
      setEditItemId(ItemVO.id);
    }
  };

  const onClickCheckbox = (ItemVO: ItemVO) => {
    onCheckItem(ItemVO.id, !ItemVO.isDone);
  };

  const onClickSave = (ItemVO: ItemVO) => {
    onUpdateItem(ItemVO.id, ItemVO.content);
    if (ItemVO.id === editItemId) {
      setEditItemId(null);
    } else {
      setEditItemId(ItemVO.id);
    }
  };

  const onClickDelete = (id: string) => {
    onDeleteItem(id);
  };

  const editContent = (id: string, content: string) => {
    onContentStateTrack(id, content);
  };

  return (
    <List className={styles.root}>
      {items.map((ItemVO) => {
        console.log("aaaa");

        const isEditing = ItemVO.id === editItemId;
        return (
          <Card key={ItemVO.id} sx={{ mb: 1 }}>
            <ListItem dense>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={ItemVO.isDone}
                  onClick={() => onClickCheckbox(ItemVO)}
                />
              </ListItemIcon>
              {isEditing ? (
                <TextField
                  fullWidth
                  id={ItemVO.id}
                  value={ItemVO.content}
                  onChange={(e) => {
                    editContent(ItemVO.id, e.target.value);
                  }}
                  className={ItemVO.isDone ? styles.completed : undefined}
                  autoFocus
                />
              ) : (
                <ListItemText
                  primary={ItemVO.content}
                  className={ItemVO.isDone ? styles.completed : undefined}
                />
              )}
              <IconButton
                edge="end"
                onClick={() => {
                  isEditing && beforeEdit !== ItemVO.content
                    ? onClickSave(ItemVO)
                    : onClickEdit(ItemVO, isEditing);
                  setBeforeEdit(ItemVO.content);
                }}
              >
                {isEditing ? <SaveIcon /> : <EditIcon />}
              </IconButton>
              <IconButton edge="end" onClick={() => onClickDelete(ItemVO.id)}>
                <DeleteIcon />
              </IconButton>
            </ListItem>
          </Card>
        );
      })}
    </List>
  );
};

export default memo(ItemList);
