import { useMemo, useState } from "react";
import {
  CheckCircle2,
  ExternalLink,
  FileText,
  MessageSquare,
  X,
} from "lucide-react";

const filters = [
  { label: "All Submissions", value: "ALL" },
  { label: "Awaiting Review", value: "SUBMITTED" },
  { label: "Approved", value: "APPROVED" },
  { label: "Revision Requested", value: "REVISION_REQUESTED" },
];

function formatStatus(status) {
  return status.replace(/_/g, " ");
}

function getStatusLabel(status) {
  return status === "APPROVED"
    ? "APPROVED — Awaiting Payment"
    : formatStatus(status);
}

function SubmissionDetails({
  submission,
  bounty,
  onApprove,
  onRequestRevision,
  onClose,
}) {
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState("");
  const canReview = submission.status === "SUBMITTED";

  function handleRevision(event) {
    event.preventDefault();
    const result = onRequestRevision(submission.id, feedback);
    if (!result.success) {
      setError(result.error);
      return;
    }
    setFeedback("");
    setError("");
  }

  function handleApproval() {
    const result = onApprove(submission.id);
    if (!result.success) {
      setError(result.error);
    }
  }

  return (
    <div className="submission-details">
      <div className="submission-details-header">
        <div>
          <p className="eyebrow">SUBMISSION REVIEW</p>
          <h2>{submission.title || "Untitled submission"}</h2>
        </div>
        <button className="icon-button" onClick={onClose} aria-label="Close submission">
          <X size={18} />
        </button>
      </div>
      <div className="submission-detail-grid">
        <div>
          <span>Related bounty</span>
          <strong>{bounty?.title || "Unknown bounty"}</strong>
        </div>
        <div>
          <span>Worker</span>
          <strong>{submission.workerName || "Unknown worker"}</strong>
        </div>
        <div>
          <span>Business / client</span>
          <strong>{submission.clientName || bounty?.business || "Unknown client"}</strong>
        </div>
        <div>
          <span>Submitted</span>
          <strong>{submission.submittedAt || "Date not provided"}</strong>
        </div>
        <div>
          <span>Reward</span>
          <strong>${Number(bounty?.reward || submission.reward || 0).toFixed(2)} USDC</strong>
        </div>
        <div>
          <span>Status</span>
          <strong>
            <span className={`status-tag status-${submission.status.toLowerCase()}`}>
              {getStatusLabel(submission.status)}
            </span>
          </strong>
        </div>
      </div>
      <div className="submission-content">
        <h3>Description</h3>
        <p>{submission.description || "No description provided."}</p>
        {submission.deliveryLink && (
          <p>
            <strong>Delivery link: </strong>
            <a href={submission.deliveryLink} target="_blank" rel="noreferrer">
              Open delivery <ExternalLink size={13} />
            </a>
          </p>
        )}
        {submission.notes && (
          <p>
            <strong>Additional notes: </strong>
            {submission.notes}
          </p>
        )}
        {submission.revisionFeedback && (
          <div className="revision-feedback">
            <strong>Revision feedback</strong>
            <p>{submission.revisionFeedback}</p>
          </div>
        )}
      </div>
      {canReview && (
        <div className="review-actions">
          <button className="primary-button" onClick={handleApproval}>
            <CheckCircle2 size={17} />
            Approve Submission
          </button>
          <form onSubmit={handleRevision} className="revision-form">
            <label htmlFor={`feedback-${submission.id}`}>Revision feedback</label>
            <textarea
              id={`feedback-${submission.id}`}
              required
              value={feedback}
              onChange={(event) => {
                setFeedback(event.target.value);
                setError("");
              }}
              placeholder="Explain what needs improvement..."
            />
            <button type="submit" className="secondary-button">
              <MessageSquare size={16} />
              Request Revision
            </button>
          </form>
        </div>
      )}
      {submission.status === "APPROVED" && (
        <div className="approval-notice">
          Work approved — awaiting payment. Payment confirmation will appear after
          backend verification.
        </div>
      )}
      {error && <div className="review-error">{error}</div>}
    </div>
  );
}

function Submissions({
  bounties,
  submissions,
  onApproveSubmission,
  onRequestRevision,
}) {
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [selectedId, setSelectedId] = useState(null);
  const [notice, setNotice] = useState("");
  const visibleSubmissions = useMemo(
    () =>
      submissions.filter(
        (submission) =>
          activeFilter === "ALL" || submission.status === activeFilter,
      ),
    [submissions, activeFilter],
  );
  const selectedSubmission = submissions.find((item) => item.id === selectedId);
  const selectedBounty = bounties.find(
    (bounty) => String(bounty.id) === String(selectedSubmission?.bountyId),
  );

  function handleApprove(submissionId) {
    const result = onApproveSubmission(submissionId);
    if (result.success) {
      setNotice("Submission approved. Payment remains awaiting backend confirmation.");
    }
    return result;
  }

  function handleRevision(submissionId, feedback) {
    const result = onRequestRevision(submissionId, feedback);
    if (result.success) {
      setNotice("Revision requested. The worker can now update and resubmit this work.");
    }
    return result;
  }

  return (
    <div className="page-content">
      <div className="welcome-row">
        <div>
          <p className="eyebrow">CLIENT WORKSPACE</p>
          <h1>Submissions</h1>
          <p className="page-description">
            Review submitted work and follow its verification status.
          </p>
        </div>
      </div>
      <div className="task-filters" role="group" aria-label="Submission status filters">
        {filters.map((filter) => (
          <button
            key={filter.value}
            className={`filter-button ${
              activeFilter === filter.value ? "selected" : ""
            }`}
            onClick={() => setActiveFilter(filter.value)}
          >
            {filter.label}
          </button>
        ))}
      </div>
      {notice && <div className="task-notice">{notice}</div>}
      {visibleSubmissions.length === 0 ? (
        <div className="empty-state">
          <FileText size={35} />
          <h3>No submissions in this view</h3>
          <p>Submitted work and review updates will appear here.</p>
        </div>
      ) : (
        <div className="submission-list">
          {visibleSubmissions.map((submission) => {
            const bounty = bounties.find(
              (item) => String(item.id) === String(submission.bountyId),
            );
            return (
              <article className="submission-card" key={submission.id}>
                <div>
                  <div className="bounty-card-top">
                    <span className="category-tag">{bounty?.category || "Work"}</span>
                    <span
                      className={`status-tag status-${submission.status.toLowerCase()}`}
                    >
                      {getStatusLabel(submission.status)}
                    </span>
                  </div>
                  <h2>{submission.title || "Untitled submission"}</h2>
                  <p className="bounty-description">
                    {bounty?.title || "Related bounty unavailable"}
                  </p>
                  <div className="task-meta">
                    <span>{submission.workerName || "Worker not provided"}</span>
                    <span>
                      ${Number(bounty?.reward || submission.reward || 0).toFixed(2)} USDC
                    </span>
                    <span>{submission.submittedAt || "Date not provided"}</span>
                  </div>
                </div>
                <button
                  className="view-button"
                  onClick={() => setSelectedId(submission.id)}
                >
                  Review submission
                </button>
              </article>
            );
          })}
        </div>
      )}
      {selectedSubmission && (
        <SubmissionDetails
          submission={selectedSubmission}
          bounty={selectedBounty}
          onApprove={handleApprove}
          onRequestRevision={handleRevision}
          onClose={() => setSelectedId(null)}
        />
      )}
    </div>
  );
}

export default Submissions;
