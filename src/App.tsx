import { useEffect } from "react";
import "./App.css";
import { Dashboard } from "./components/Dashboard";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { useAppContext } from "./context/AppContext";

const list = [
  {
    id: 1,
    title: "Learn Java",
    description: "Learn java for fullstack development",
    status: "pending",
    assignee: "Gaurish Kamat",
  },
  {
    id: 2,
    title: "Cook",
    description: "Cooking lunch and dinner",
    status: "in-progress",
    assignee: "Pooja Kamat",
  },
  {
    id: 3,
    title: "Learn BTP",
    description: "Learn SAP BTP",
    status: "completed",
    assignee: "Pooja Kamat",
  },
  {
    id: 4,
    title: "Walk",
    description: "Go for a brisk walk",
    status: "pending",
    assignee: "Gaurish Kamat",
  },
];

function App() {
  const { setList } = useAppContext();

  useEffect(() => {
    setList(list);
  }, []);

  return (
    <main
      className="app"
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header />
      <Dashboard />
      <Footer />
    </main>
  );
}

export default App;
