import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRecommendations } from "../services/api";
import { UserContext } from "../context/UserContext";
import "./dashboard.css";

function Dashboard() {
  const navigate = useNavigate();
  const { setUserProfile } = useContext(UserContext);

  const [form, setForm] = useState({
    exam: "MCAT",
    target_score: "",
    current_score: "",
    weak_subjects: "",
    learning_style: "visual",
    time_left_weeks: 8,
    is_retaker: true,
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...form,
        weak_subjects: form.weak_subjects
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        time_left_weeks: Number(form.time_left_weeks),
      };

      setUserProfile(payload);

      const data = await getRecommendations(payload);
      setResult(data);

      navigate("/resources");
    } catch (error) {
      console.error(error);
      alert("Backend request failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dash-content">
      <header className="hero">
        <div className="hero-badge">MCAT Retaker MVP</div>
        <h1>Personalized exam prep that gives students direction, not just resources.</h1>
        <p>
          Build a smarter study journey with diagnostics, recommendations, and progress
          tracking for students who need a clear comeback plan.
        </p>

        <div className="hero-stats" id="overview">
          <div className="stat-card">
            <span className="stat-label">Audience</span>
            <strong>Retakers</strong>
          </div>
          <div className="stat-card">
            <span className="stat-label">Focus</span>
            <strong>MCAT</strong>
          </div>
          <div className="stat-card">
            <span className="stat-label">Output</span>
            <strong>Study plan + resources</strong>
          </div>
        </div>
      </header>

      <section className="main-grid">
        <div className="panel" id="diagnostic">
          <h2>Student Input</h2>
          <p className="section-subtitle">
            Enter what the student knows so the system can recommend what they need.
          </p>

          <form onSubmit={handleSubmit} className="form-grid">
            <label>
              Exam
              <input name="exam" value={form.exam} onChange={handleChange} />
            </label>

            <label>
              Target score
              <input
                name="target_score"
                value={form.target_score}
                onChange={handleChange}
                placeholder="e.g. 515"
              />
            </label>

            <label>
              Current score
              <input
                name="current_score"
                value={form.current_score}
                onChange={handleChange}
                placeholder="e.g. 498"
              />
            </label>

            <label className="full-width">
              Weak subjects
              <input
                name="weak_subjects"
                value={form.weak_subjects}
                onChange={handleChange}
                placeholder="e.g. Biology, Physics, CARS"
              />
            </label>

            <label>
              Learning style
              <select name="learning_style" value={form.learning_style} onChange={handleChange}>
                <option value="visual">Visual</option>
                <option value="reading">Reading</option>
                <option value="practice">Practice-heavy</option>
              </select>
            </label>

            <label>
              Time left (weeks)
              <input
                type="number"
                name="time_left_weeks"
                value={form.time_left_weeks}
                onChange={handleChange}
              />
            </label>

            <label className="checkbox-row full-width">
              <input
                type="checkbox"
                name="is_retaker"
                checked={form.is_retaker}
                onChange={handleChange}
              />
              Retaker
            </label>

            <button type="submit" className="primary-btn" disabled={loading}>
              {loading ? "Generating..." : "Generate Recommendations"}
            </button>
          </form>
        </div>

        <aside className="panel preview-panel">
          <h2>Live Preview</h2>
          <p className="section-subtitle">
            A quick snapshot of the student journey before recommendations are generated.
          </p>

          <div className="preview-card">
            <div className="preview-row">
              <span>Current Score</span>
              <strong>{form.current_score || "--"}</strong>
            </div>
            <div className="preview-row">
              <span>Target Score</span>
              <strong>{form.target_score || "--"}</strong>
            </div>
            <div className="preview-row">
              <span>Time Left</span>
              <strong>{form.time_left_weeks} weeks</strong>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: "42%" }} />
            </div>
            <p className="small-note">
              This is where score gaps, weekly milestones, and confidence tracking can live.
            </p>
          </div>

          <div className="mini-card" id="progress">
            <h3>Story View</h3>
            <p>Start → gap analysis → weekly action plan → score improvement.</p>
          </div>
        </aside>
      </section>

      {result && (
        <section className="panel results-panel" id="recommendations">
          <h2>Recommended Path</h2>
          <p className="section-subtitle">
            <strong>{result.profile_summary.exam}</strong> | Target:{" "}
            {result.profile_summary.target_score} | Current: {result.profile_summary.current_score}
          </p>

          <div className="results-grid">
            {result.recommendations.map((item, index) => (
              <article key={index} className="result-card">
                <div className="result-tag">{item.type}</div>
                <h3>{item.title}</h3>
                <p>{item.reason}</p>
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default Dashboard;