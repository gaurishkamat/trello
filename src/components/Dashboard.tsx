import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { Item } from "./Item";
import { Popup } from "./Popup";

interface ListItem {
  id: number;
  title: string;
  description: string;
  status?: string;
  assignee?: string;
}

export function Dashboard() {
  const { list, updateItem } = useAppContext();
  const [open, setOpen] = useState(false);

  const dropHandler = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    const data = event.dataTransfer.getData("item"); // e.g. "item-123"
    const itemId = data.split("-")[2];
    const status = event.currentTarget.id || "";

    const item = list.find((item: ListItem) => item.id == itemId);
    if (!item) return;

    switch (status) {
      case "pending":
      case "in-progress":
      case "completed":
        updateItem({ ...item, status });
        break;
      default:
        updateItem({ ...item, status: "pending" });
    }
  };

  const dragoverHandler = (event: any) => {
    event.preventDefault();
  };

  const onAddItemClick = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <section>
      <Popup open={open} onClose={onClose} title="Add Item" />
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button className="secondary" onClick={onAddItemClick}>
          Add Item
        </button>
      </div>
      <div className="dashboard">
        <div className="left">1</div>
        <div className="right">
          <div
            className="column"
            onDrop={(event) => dropHandler(event)}
            onDragOver={(event) => dragoverHandler(event)}
            id="pending"
          >
            <h3>Pending:</h3>
            {list
              ?.filter((item: any) => item.status === "pending")
              .map((item: any) => (
                <Item
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  description={item.description}
                  status={item.status}
                />
              ))}
          </div>
          <div
            className="column"
            onDrop={(event) => dropHandler(event)}
            onDragOver={(event) => dragoverHandler(event)}
            id="in-progress"
          >
            <h3>In Progress:</h3>
            {list
              ?.filter((item: any) => item.status === "in-progress")
              .map((item: any) => (
                <Item
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  description={item.description}
                  status={item.status}
                />
              ))}
          </div>
          <div
            className="column"
            onDrop={(event) => dropHandler(event)}
            onDragOver={(event) => dragoverHandler(event)}
            id="completed"
          >
            <h3>Completed:</h3>
            {list
              ?.filter((item: any) => item.status === "completed")
              .map((item: any) => (
                <Item
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  description={item.description}
                  status={item.status}
                />
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
