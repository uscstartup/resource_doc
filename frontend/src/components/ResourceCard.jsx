import "./ResourceCard.css";

function ResourceCard({ resource }) {
  return (
    <article className="resource-card">
      <div className="resource-top">
        <span className="resource-pill">{resource.type}</span>
        <span className="resource-topic">{resource.topic}</span>
      </div>

      <h3>{resource.title}</h3>
      <p>{resource.reason}</p>

      <div className="resource-footer">
        <span className="resource-level">{resource.level}</span>
        <a href={resource.link}>Open</a>
      </div>
    </article>
  );
}

export default ResourceCard;