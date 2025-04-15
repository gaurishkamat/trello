import { FormEvent, useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { v6 as uuid } from "uuid";

interface AddItemProps {
  isEdit?: boolean;
  id?: string;
}

export function AddItem({ isEdit = false, id = "" }: AddItemProps) {
  const { addItem, editItem } = useAppContext();
  const [formData, setFormData] = useState({ title: "", description: "" });

  useEffect(() => {}, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isEdit) {
      editItem({
        id,
        title: formData.title,
        description: formData.description,
        status: "pending",
      });
    } else {
      addItem({
        id: uuid(),
        title: formData.title,
        description: formData.description,
        status: "pending",
      });
    }
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
          name="title"
          type="text"
          value={formData.title}
          onChange={(e) => handleChange(e)}
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
          name="description"
          value={formData.description}
          placeholder="Say something more!!"
          onChange={(e) => handleChange(e)}
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
