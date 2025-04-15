import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { Item } from "./Item";
import { Popup } from "./Popup";
import { AddItem } from "./AddItem";
import AddIcon from "../assets/add_icon.png";
import { ListItem } from "../types";

export function Dashboard() {
  const { list, editItem, isEdit } = useAppContext();
  const [open, setOpen] = useState(false);

  const getCount = (status: string) => {
    if (!status) return list.length;
    return list.filter((item: ListItem) => item.status === status).length;
  };

  const dropHandler = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    const data = event.dataTransfer.getData("item"); // e.g. "item-123"
    const itemId = data.split("item-")[1];
    const status = event.currentTarget.id || "";

    const item = list.find((item: ListItem) => item.id === itemId);
    if (!item) return;

    switch (status) {
      case "pending":
      case "in-progress":
      case "completed":
        editItem({ ...item, status });
        break;
      default:
        editItem({ ...item, status: "pending" });
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
      <Popup open={open} onClose={onClose} title="Add Item">
        <AddItem isEdit={isEdit} />
      </Popup>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button className="secondary" onClick={onAddItemClick}>
          <img
            alt="addIcon"
            src={AddIcon}
            height={18}
            width={18}
            className="icon"
          />
          Add Item
        </button>
      </div>
      <div className="dashboard">
        <div
          className="left"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            padding: "10px",
            fontWeight: 700,
            fontSize: "18px",
          }}
        >
          <div>Total: {getCount("")}</div>
          <div>Pending: {getCount("pending")}</div>
          <div>In Progress: {getCount("in-progress")}</div>
          <div>Completed: {getCount("completed")}</div>
        </div>
        <div className="right">
          <div
            className="column"
            onDrop={(event) => dropHandler(event)}
            onDragOver={(event) => dragoverHandler(event)}
            id="pending"
          >
            <h3 style={{ padding: "8px" }}>PENDING ({getCount("pending")})</h3>
            {list
              ?.filter((item: any) => item.status === "pending")
              .map((item: any) => (
                <Item
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  description={item.description}
                  status={item.status}
                  setOpen={setOpen}
                />
              ))}
          </div>
          <div
            className="column"
            onDrop={(event) => dropHandler(event)}
            onDragOver={(event) => dragoverHandler(event)}
            id="in-progress"
          >
            <h3 style={{ padding: "8px" }}>
              IN PROGRESS ({getCount("in-progress")})
            </h3>
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
            <h3 style={{ padding: "8px" }}>
              COMPLETED ({getCount("completed")})
            </h3>
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
