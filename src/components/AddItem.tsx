import { FormEvent } from "react";
import { useAppContext } from "../context/AppContext";
import { v6 as uuid } from "uuid";

export function AddItem() {
  const { addItem } = useAppContext();

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;

    addItem({
      id: uuid(),
      title,
      description,
      status: "pending",
    });
  };

  return (
    <form onSubmit={(event: FormEvent<HTMLFormElement>) => onSubmit(event)}>
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
