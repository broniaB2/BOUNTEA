import { ArrowUpRight, Clock3 } from "lucide-react";

function BountyCard({ bounty }) {
  return (
    <article className="bounty-card">
      <div className="bounty-card-top">
        <span className="category-tag">{bounty.category}</span>
        <span className="status-tag">{bounty.status}</span>
      </div>
      <h3>{bounty.title}</h3>
      <p className="bounty-description">{bounty.description}</p>
      <div className="skill-list">
        {bounty.skills.map((skill) => (
          <span key={skill}>{skill}</span>
        ))}
      </div>
      <div className="bounty-business">
        <div className="business-avatar">{bounty.business.charAt(0)}</div>
        <span>{bounty.business}</span>
      </div>
      <div className="bounty-footer">
        <div className="reward">
          <strong>${Number(bounty.reward).toFixed(2)}</strong>
          <span>USDC</span>
        </div>
        <div className="deadline">
          <Clock3 size={15} />
          {bounty.deadline}
        </div>
      </div>
      <button
        className="view-button"
        onClick={() =>
          alert(
            `You selected: ${bounty.title}\n\nTask details and claiming will be implemented in the next stage.`,
          )
        }
      >
        View bounty <ArrowUpRight size={16} />
      </button>
    </article>
  );
}

export default BountyCard;
