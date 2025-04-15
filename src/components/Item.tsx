import React, { useState } from "react";
import EditIcon from "../assets/edit_icon.png";
import DeleteIcon from "../assets/delete_icon.png";
import { useAppContext } from "../context/AppContext";
import { Popup } from "./Popup";
import { AddItem } from "./AddItem";

interface ItemType {
  id: string;
  title: string;
  description: string;
  status?: string;
  assignee?: string;
  setOpen: (v: boolean) => void;
}

export const Item: React.FC<ItemType> = ({
  id,
  title,
  description,
  status = "",
  setOpen,
}) => {
  const { deleteItem, setIsEdit } = useAppContext();

  const dragstartHandler = (event: any) => {
    event.dataTransfer.setData("item", event?.target?.id);
  };

  const onDelete = (id: string) => () => {
    deleteItem(id);
  };

  const onEdit = () => () => {
    setIsEdit(true);
    setOpen(true);
  };

  return (
    <div
      className="item"
      onDragStart={(event) => dragstartHandler(event)}
      draggable
      id={`my-item-${id}`}
      style={{ borderLeft: `15px solid ${getColor(status)}` }}
    >
      <div style={{ fontSize: "12px", fontWeight: 400 }}>#{id}</div>
      <div style={{ fontWeight: "bold", fontSize: "14px" }}>{title}</div>
      <div style={{ fontSize: "14px" }}>{description}</div>
      <div style={{ marginTop: "5px" }}>
        <img
          src={EditIcon}
          height={18}
          width={18}
          className="icon"
          onClick={onEdit()}
        />
        <img
          src={DeleteIcon}
          height={18}
          width={18}
          className="icon"
          onClick={onDelete(id)}
        />
      </div>
    </div>
  );
};

enum TYPE {
  PENDING = "pending",
  IN_PROGRESS = "in-progress",
  COMPLETED = "completed",
}

const getColor = (status: string) => {
  switch (status) {
    case TYPE.PENDING:
      return "#e52020";
    case TYPE.IN_PROGRESS:
      return "#ffb200";
    case TYPE.COMPLETED:
      return "#89ac46";
    default:
      return "b2b2b2";
  }
};
