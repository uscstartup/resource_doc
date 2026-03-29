import { useContext, useMemo } from "react";
import { UserContext } from "../context/UserContext";
import "./progress.css";

function toNumber(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function Progress() {
  const { userProfile } = useContext(UserContext);

  const data = userProfile ?? {
    exam: "MCAT",
    current_score: "492",
    target_score: "510",
    time_left_weeks: 8,
    learning_style: "visual",
    is_retaker: true,
    weak_subjects: ["Biology", "CARS", "Physics"],
  };

  const metrics = useMemo(() => {
    const current = toNumber(data.current_score);
    const target = toNumber(data.target_score);

    const gap =
      current !== null && target !== null && target > current ? target - current : null;

    const progress =
      current !== null && target !== null && target > 0
        ? Math.max(0, Math.min(100, (current / target) * 100))
        : 0;

    return { current, target, gap, progress };
  }, [data]);

  const weakSubjects = data.weak_subjects || [];
  const studyDays = data.time_left_weeks ? Math.min(7, Number(data.time_left_weeks)) : 7;

  const timeline = [
    { title: "Baseline", text: `Current score: ${data.current_score}` },
    { title: "Gap analysis", text: `${metrics.gap ?? "--"} points to target` },
    { title: "Focused rebuild", text: "Study weak topics + practice questions" },
    { title: "Checkpoint", text: "Take a mini-test and review mistakes" },
    { title: "Target state", text: `Aim for ${data.target_score}` },
  ];

  return (
    <div className="page-wrap">
      <header className="page-header">
        <div className="page-badge">Journey Tracker</div>
        <h1>Progress</h1>
        <p>
          This is the student story: where they started, what is weak, what to do next,
          and how close they are to the target.
        </p>
      </header>

      <section className="hero-summary">
        <div className="summary-card">
          <span className="summary-label">Current Score</span>
          <strong>{metrics.current ?? "--"}</strong>
        </div>
        <div className="summary-card">
          <span className="summary-label">Target Score</span>
          <strong>{metrics.target ?? "--"}</strong>
        </div>
        <div className="summary-card">
          <span className="summary-label">Gap</span>
          <strong>{metrics.gap ?? "--"}</strong>
        </div>
        <div className="summary-card">
          <span className="summary-label">Weeks Left</span>
          <strong>{data.time_left_weeks}</strong>
        </div>
      </section>

      <section className="progress-grid">
        <div className="progress-card large">
          <div className="card-top">
            <h2>Score Journey</h2>
            <span className="card-chip">{data.exam}</span>
          </div>

          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${metrics.progress}%` }} />
          </div>

          <div className="progress-meta">
            <span>{Math.round(metrics.progress)}% of target reached</span>
            <span>{data.time_left_weeks} weeks left</span>
          </div>

          <div className="mini-note">
            Retaker: <strong>{data.is_retaker ? "Yes" : "No"}</strong> · Learning style:{" "}
            <strong>{data.learning_style}</strong>
          </div>
        </div>

        <div className="progress-card">
          <h2>Weak Areas</h2>
          {weakSubjects.length > 0 ? (
            <div className="tag-list">
              {weakSubjects.map((subject) => (
                <span key={subject} className="tag-pill">
                  {subject}
                </span>
              ))}
            </div>
          ) : (
            <p className="empty-text">No weak areas added yet.</p>
          )}
        </div>
      </section>

      <section className="progress-grid lower">
        <div className="progress-card">
          <h2>Journey Timeline</h2>
          <div className="timeline">
            {timeline.map((item, index) => (
              <div key={item.title} className="timeline-item">
                <div className="timeline-dot">{index + 1}</div>
                <div className="timeline-content">
                  <strong>{item.title}</strong>
                  <p>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="progress-card">
          <h2>Weekly Plan</h2>
          <div className="week-list">
            {Array.from({ length: studyDays }).map((_, index) => (
              <div key={index} className="week-item">
                <span>Day {index + 1}</span>
                <strong>
                  {index === 0
                    ? "Review weak topics"
                    : index === 1
                    ? "Practice questions"
                    : index === 2
                    ? "Take a mini quiz"
                    : index === 3
                    ? "Revise mistakes"
                    : index === 4
                    ? "Focused content study"
                    : index === 5
                    ? "Mixed practice"
                    : "Progress check"}
                </strong>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Progress;