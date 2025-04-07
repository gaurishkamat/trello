export function AddItem() {
  return (
    <form>
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
