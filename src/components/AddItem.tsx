import { FormEvent } from "react";
import { useAppContext } from "../context/AppContext";
import { v6 as uuid } from "uuid";

export function AddItem() {
  const { addItem } = useAppContext();

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log(event);

    addItem({
      id: uuid(),
      title: event.target?.title.value,
      description: event.target?.description.value,
      status: "pending",
    });
  };

  return (
    <form onSubmit={(event: FormEvent) => onSubmit(event)}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <label htmlFor="title">Title*</label>
        <input
          id="title"
          type="text"
          placeholder="What's on your mind?"
        ></input>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <label htmlFor="Description">Description</label>
        <textarea
          id="description"
          placeholder="Say something more!!"
          rows={5}
        ></textarea>
      </div>
      <button
        className="secondary"
        type="submit"
        style={{ width: "fit-content" }}
      >
        Submit
      </button>
    </form>
  );
}
