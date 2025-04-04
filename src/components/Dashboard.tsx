import { useAppContext } from "../context/AppContext";
import { Item } from "./Item";

export function Dashboard() {
  const { list } = useAppContext();

  const dropHandler = (event: any) => {
    event.preventDefault();
    const data = event.dataTransfer.getData("item");
    event.target.appendChild(document.getElementById(data));
  };

  const dragoverHandler = (event: any) => {
    event.preventDefault();
  };

  return (
    <section>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button className="secondary" onClick={() => alert()}>
          Add Item
        </button>
      </div>
      <div className="dashboard">
        <div className="left">1</div>
        <div className="right">
          <div className="column">
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
