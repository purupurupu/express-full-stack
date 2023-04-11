import React, { memo, useState } from "react";
import { ItemVO } from "../types/vo";
import { FC } from "react";

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
    <ul className="divide-y divide-gray-200">
      {items.map((ItemVO) => {
        console.log("aaaa");

        const isEditing = ItemVO.id === editItemId;
        return (
          <li key={ItemVO.id} className="flex py-4">
            <div className="flex-shrink-0">
              <input
                type="checkbox"
                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                checked={ItemVO.isDone}
                onChange={() => onClickCheckbox(ItemVO)}
              />
            </div>
            {isEditing ? (
              <input
                type="text"
                id={ItemVO.id}
                value={ItemVO.content}
                onChange={(e) => {
                  editContent(ItemVO.id, e.target.value);
                }}
                // className={`ml-3 form-input ${
                //   ItemVO.isDone ? styles.completed : undefined
                // }`}
                autoFocus
              />
            ) : (
              <p
              // className={`ml-3 ${
              //   ItemVO.isDone ? styles.completed : undefined
              // }`}
              >
                {ItemVO.content}
              </p>
            )}
            <div className="flex ml-auto space-x-2">
              <button
                type="button"
                className="text-indigo-600 hover:text-indigo-900"
                onClick={() => {
                  isEditing && beforeEdit !== ItemVO.content
                    ? onClickSave(ItemVO)
                    : onClickEdit(ItemVO, isEditing);
                  setBeforeEdit(ItemVO.content);
                }}
              >
                {isEditing ? "Save" : "Edit"}
              </button>
              <button
                type="button"
                className="text-indigo-600 hover:text-indigo-900"
                onClick={() => onClickDelete(ItemVO.id)}
              >
                Delete
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default memo(ItemList);
