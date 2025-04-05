import { createContext, useContext, useState } from "react";

interface AppContextType {
  list: ListItem[] | [];
  setList: any;
  addItem: (listItem: ListItem) => void;
  updateItem: (listItem: ListItem) => void;
  deleteItem: (id: number) => void;
}

interface ListItem {
  id: number;
  title: string;
  description: string;
  status?: string;
  assignee?: string;
}

const AppContext = createContext<AppContextType | null>(null);

const AppContextProvider = ({ children }: any) => {
  const [list, setList] = useState<ListItem[] | []>([]);

  function addItem(listItem: ListItem) {
    setList([...list, listItem]);
  }

  function deleteItem(id: number) {
    setList(list.filter((item: ListItem) => item.id !== id));
  }

  function updateItem(listItem: ListItem) {
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
      value={{ list, setList, addItem, updateItem, deleteItem }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AppContextProvider;
