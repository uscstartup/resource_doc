import "./progress.css";

function Progress() {
  const data = {
    exam: "MCAT",
    current: 492,
    target: 510,
    gap: 18,
    progress: 65,
    weeksLeft: 8,
    weakSubjects: ["Biology", "CARS", "Physics"],
  };

  const timeline = [
    {
      step: "01",
      title: "Baseline",
      text: `Current score: ${data.current}`,
    },
    {
      step: "02",
      title: "Gap Analysis",
      text: `${data.gap} points needed to reach target`,
    },
    {
      step: "03",
      title: "Focused Study",
      text: "Work on weak subjects and daily practice",
    },
    {
      step: "04",
      title: "Checkpoint",
      text: "Weekly test and performance review",
    },
    {
      step: "05",
      title: "Target",
      text: `Reach ${data.target}`,
    },
  ];

  const weeklyPlan = [
    "Review weak topics",
    "Practice questions",
    "Take a mini quiz",
    "Revise mistakes",
    "Focused content study",
    "Mixed practice",
    "Progress check",
  ];

  return (
    <div className="progress-page">
      <header className="progress-hero">
        <div className="eyebrow">Journey Tracker</div>
        <h1>Progress</h1>
        <p>
          This is the student journey from current level to target score, with a clear plan,
          weak-area focus, and visible milestones.
        </p>
      </header>

      <section className="stats-grid">
        <div className="stat-card">
          <span>Current Score</span>
          <strong>{data.current}</strong>
        </div>
        <div className="stat-card">
          <span>Target Score</span>
          <strong>{data.target}</strong>
        </div>
        <div className="stat-card">
          <span>Gap</span>
          <strong>{data.gap}</strong>
        </div>
        <div className="stat-card">
          <span>Weeks Left</span>
          <strong>{data.weeksLeft}</strong>
        </div>
      </section>

      <section className="main-grid">
        <div className="card hero-card">
          <div className="card-header">
            <div>
              <h2>Score Journey</h2>
              <p>How far the student has moved toward the target.</p>
            </div>
            <span className="badge">{data.exam}</span>
          </div>

          <div className="score-row">
            <div className="score-item">
              <span>Current</span>
              <strong>{data.current}</strong>
            </div>
            <div className="score-item">
              <span>Target</span>
              <strong>{data.target}</strong>
            </div>
            <div className="score-item">
              <span>Gap</span>
              <strong>{data.gap}</strong>
            </div>
          </div>

          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${data.progress}%` }} />
          </div>

          <div className="progress-meta">
            <span>{data.progress}% of target reached</span>
            <span>{data.weeksLeft} weeks left</span>
          </div>

          <div className="mini-info">
            Retaker: <strong>Yes</strong> · Learning style: <strong>Visual</strong>
          </div>
        </div>

        <div className="card side-card">
          <h2>Weak Areas</h2>
          <div className="tag-list">
            {data.weakSubjects.map((subject) => (
              <span key={subject} className="tag-pill">
                {subject}
              </span>
            ))}
          </div>

          <div className="small-note">
            These are the topics the system should prioritize first.
          </div>
        </div>
      </section>

      <section className="lower-grid">
        <div className="card">
          <h2>Study Journey</h2>
          <div className="timeline">
            {timeline.map((item) => (
              <div key={item.step} className="timeline-item">
                <div className="timeline-step">{item.step}</div>
                <div className="timeline-content">
                  <strong>{item.title}</strong>
                  <p>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h2>Weekly Plan</h2>
          <div className="week-list">
            {weeklyPlan.map((item, index) => (
              <div key={item} className="week-item">
                <div className="week-day">Day {index + 1}</div>
                <div className="week-task">{item}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Progress; 