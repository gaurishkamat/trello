import "./App.css";
import { Dashboard } from "./components/Dashboard";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";

function App() {
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
