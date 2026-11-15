function MyTasks() {
  return (
    <div className="page-content">
      <div className="welcome-row">
        <div>
          <p className="eyebrow">YOUR WORKSPACE</p>
          <h1>My Tasks</h1>
          <p className="page-description">
            Keep track of bounties you have claimed and work in progress.
          </p>
        </div>
      </div>
      <div className="empty-state">
        <h3>No active tasks</h3>
        <p>Claim a bounty from the marketplace to see it here.</p>
      </div>
    </div>
  );
}

export default MyTasks;
