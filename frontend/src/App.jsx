import { Routes, Route, NavLink } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Resources from "./pages/resources";
import Progress from "./pages/progress";
import "./App.css";

function App() {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div>
          <div className="brand">RESOURCE DOC</div>
          <p className="sidebar-text">MCAT retaker dashboard</p>
        </div>

        <nav className="side-nav">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "side-link active" : "side-link")}
            end
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/resources"
            className={({ isActive }) => (isActive ? "side-link active" : "side-link")}
          >
            Resources
          </NavLink>

          <NavLink
            to="/progress"
            className={({ isActive }) => (isActive ? "side-link active" : "side-link")}
          >
            Progress
          </NavLink>
        </nav>

        <div className="sidebar-card">
          <span className="sidebar-label">Current focus</span>
          <strong>Retakers</strong>
          <p>
            Students who already attempted the exam and need a smarter comeback plan.
          </p>
        </div>
      </aside>

      <main className="content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/progress" element={<Progress />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;