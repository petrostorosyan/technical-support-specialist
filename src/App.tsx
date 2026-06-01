import "./App.css";
import Header from "./components/header/Header";

function App() {
  return (
    <div className="app">
      <Header />
      <div style={{ height: "2000px", padding: "20px" }}>
        <h1>Welcome to My App</h1>
        <p>This is a simple React app with a header.</p>
      </div>
    </div>
  );
}

export default App;
