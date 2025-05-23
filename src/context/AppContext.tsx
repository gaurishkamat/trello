import { createContext, useContext, useState } from "react";
import { ListItem } from "../types";

interface AppContextType {
  list: ListItem[] | [];
  setList: React.Dispatch<React.SetStateAction<ListItem[]>>;
  addItem: (listItem: ListItem) => void;
  editItem: (listItem: ListItem) => void;
  deleteItem: (id: string) => void;
  isEdit: boolean;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

const initialList = [
  {
    id: "1",
    title: "Learn Java",
    description: "Learn java for fullstack development",
    status: "pending",
    assignee: "Gaurish Kamat",
  },
  {
    id: "2",
    title: "Cook",
    description: "Cooking lunch and dinner",
    status: "in-progress",
    assignee: "Pooja Kamat",
  },
  {
    id: "3",
    title: "Learn BTP",
    description: "Learn SAP BTP",
    status: "completed",
    assignee: "Pooja Kamat",
  },
  {
    id: "4",
    title: "Walk",
    description: "Go for a brisk walk",
    status: "pending",
    assignee: "Gaurish Kamat",
  },
];

const AppContext = createContext<AppContextType | null>(null);

const AppContextProvider = ({ children }: any) => {
  const [list, setList] = useState<ListItem[] | []>(initialList);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  function addItem(listItem: ListItem) {
    const newList = [...list, listItem];
    setList(newList);
  }

  function deleteItem(id: string) {
    setList(list.filter((item: ListItem) => item.id !== id));
  }

  function editItem(listItem: ListItem) {
    let updateList = list.map((item: ListItem) => {
      if (item.id == listItem.id) {
        return { ...item, ...listItem };
      }
      return item;
    });

    setList(updateList);
  }

  return (
    <AppContext.Provider
      value={{
        list,
        setList,
        addItem,
        editItem,
        deleteItem,
        isEdit,
        setIsEdit,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppComtext must be used within an AppContextProvider");
  }
  return context;
};

export default AppContextProvider;
