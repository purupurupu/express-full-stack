import { FC, useState } from "react";

type Props = {
  onAddItem: (itemContent: string) => Promise<void>;
};

const ItemForm: FC<Props> = ({ onAddItem }) => {
  const [itemContent, setItemContent] = useState("");

  const onClickAdd = async () => {
    await onAddItem(itemContent);
    setItemContent("");
  };

  return (
    <div className="columns-2">
      <input
        type="text"
        placeholder="TODOを入力してください"
        value={itemContent}
        className="block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
        onChange={(e) => setItemContent(e.target.value)}
      />
      <button
        type="button"
        className="inline-flex items-center px-4 py-2 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={() => onClickAdd()}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 mr-2"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M14.707 8.707a1 1 0 00-1.414-1.414L10 10.586 6.707 7.293a1 1 0 00-1.414 1.414l3.292 3.292a1 1 0 001.414 0l3.292-3.292z"
            clipRule="evenodd"
          />
        </svg>
        Add
      </button>
    </div>
  );
};

export default ItemForm;
