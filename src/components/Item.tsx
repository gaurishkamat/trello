import React from "react";
import { PencilSquareIcon } from "@heroicons/react/16/solid";

interface ItemType {
  id: number;
  title: string;
  description: string;
  status?: string;
  assignee?: string;
}

export const Item: React.FC<ItemType> = ({
  id,
  title,
  description,
  status = "",
}) => {
  const dragstartHandler = (event: any) => {
    event.dataTransfer.setData("item", event?.target?.id);
  };

  return (
    <div
      className="item"
      onDragStart={(event) => dragstartHandler(event)}
      draggable
      id={`my-item-${id}`}
      style={{ borderLeft: `15px solid ${getColor(status)}` }}
    >
      <div style={{ fontSize: "12px", fontWeight: 200 }}>Task No: {id}</div>
      <div style={{ fontWeight: "bold", fontSize: "14px" }}>{title}</div>
      <div style={{ fontSize: "12px" }}>{description}</div>
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
