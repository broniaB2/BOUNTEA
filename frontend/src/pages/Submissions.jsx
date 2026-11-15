function Submissions() {
  return (
    <div className="page-content">
      <div className="welcome-row">
        <div>
          <p className="eyebrow">YOUR WORKSPACE</p>
          <h1>Submissions</h1>
          <p className="page-description">
            Review submitted work and follow its verification status.
          </p>
        </div>
      </div>
      <div className="empty-state">
        <h3>No submissions yet</h3>
        <p>Completed work and review updates will appear here.</p>
      </div>
    </div>
  );
}

export default Submissions;
