import { useContext, useMemo, useState } from "react";
import { mockResources } from "../data/mockresources";
import ResourceCard from "../components/ResourceCard";
import { UserContext } from "../context/UserContext";
import "./Resources.css";

const tabs = ["All", "Biology", "Physics", "CARS", "Organic Chem", "Strategy"];

function normalize(text) {
  return String(text).toLowerCase().trim();
}

function Resources() {
  const { userProfile } = useContext(UserContext);
  const [activeTab, setActiveTab] = useState("All");

  const filteredResources = useMemo(() => {
    let resources = mockResources;

    if (activeTab !== "All") {
      resources = resources.filter(
        (resource) =>
          normalize(resource.topic).includes(normalize(activeTab)) ||
          normalize(activeTab).includes(normalize(resource.topic))
      );
    }

    if (userProfile?.weak_subjects?.length) {
      const weakSubjects = userProfile.weak_subjects.map(normalize);

      const matched = resources.filter((resource) =>
        weakSubjects.some(
          (subject) =>
            normalize(resource.topic).includes(subject) ||
            subject.includes(normalize(resource.topic))
        )
      );

      return matched.length > 0 ? matched : resources;
    }

    return resources;
  }, [activeTab, userProfile]);

  return (
    <div className="page-wrap">
      <header className="page-header">
        <div className="page-badge">Personalized Library</div>
        <h1>Resources</h1>
        <p>
          Curated MCAT material for retakers, organized by topic, level, and what the student
          actually needs right now.
        </p>
      </header>

      {userProfile?.weak_subjects?.length ? (
        <div className="weak-banner">
          <span>Your weak areas:</span>
          <strong>{userProfile.weak_subjects.join(", ")}</strong>
        </div>
      ) : null}

      <div className="tab-row">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={activeTab === tab ? "tab-btn active" : "tab-btn"}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="results-grid">
        {filteredResources.map((resource) => (
          <ResourceCard key={resource.id} resource={resource} />
        ))}
      </div>
    </div>
  );
}

export default Resources;