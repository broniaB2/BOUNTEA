import {
  ArrowUpRight,
  BriefcaseBusiness,
  CheckCircle2,
  Compass,
  Plus,
  Sparkles,
  Wallet,
} from "lucide-react";
import { BountyExplorer } from "./Marketplace";

function StatCard({ icon: Icon, tone, label, value, description }) {
  return (
    <div className="stat-card">
      <div className={`stat-icon ${tone}`}>
        <Icon size={21} />
      </div>
      <div>
        <p>{label}</p>
        <h2>{value}</h2>
        <span>{description}</span>
      </div>
    </div>
  );
}

function HeroBanner({ onCreateBounty }) {
  return (
    <section className="hero-banner">
      <div className="hero-content">
        <span className="hero-tag">
          <Sparkles size={14} /> THE FUTURE OF WORK
        </span>
        <h2>
          Small tasks.
          <br />
          Bigger opportunities.
        </h2>
        <p>
          Connect businesses with skilled people and AI agents. Complete
          meaningful work and get paid through Stellar.
        </p>
        <button className="hero-button" onClick={onCreateBounty}>
          Post a bounty <ArrowUpRight size={17} />
        </button>
      </div>
      <div className="hero-decoration">
        <div className="floating-card card-one">
          <Wallet size={19} />
          <div>
            <strong>USDC rewards</strong>
            <span>Stellar network</span>
          </div>
        </div>
        <div className="floating-card card-two">
          <CheckCircle2 size={19} />
          <div>
            <strong>Verified work</strong>
            <span>Transparent delivery</span>
          </div>
        </div>
        <div className="hero-circle">
          <Sparkles size={75} />
        </div>
      </div>
    </section>
  );
}

function Dashboard({
  bounties,
  filteredBounties,
  search,
  category,
  categories,
  onSearchChange,
  onCategoryChange,
  onCreateBounty,
  user,
  showBusinessActions,
}) {
  const isBusiness = user?.role === "business";
  const visibleBounties = isBusiness
    ? bounties.filter((bounty) => bounty.createdBy === user.email)
    : bounties;
  const claimedBounties = bounties.filter(
    (bounty) => bounty.claimedBy === user?.name,
  );

  return (
    <div className="page-content">
      <div className="welcome-row">
        <div>
          <p className="eyebrow">YOUR OPPORTUNITY STARTS HERE</p>
          <h1>Explore opportunities</h1>
          <p className="page-description">
            Discover meaningful work, complete tasks and earn through
            autonomous payments on Stellar.
          </p>
        </div>
        {showBusinessActions && (
          <button className="primary-button" onClick={onCreateBounty}>
            <Plus size={18} />
            Create bounty
          </button>
        )}
      </div>

      <section className="stats-grid">
        <StatCard
          icon={Compass}
          tone="purple"
          label="Available bounties"
          value={visibleBounties.length}
          description="Opportunities to explore"
        />
        <StatCard
          icon={BriefcaseBusiness}
          tone="blue"
          label="Active tasks"
          value={claimedBounties.filter(
            (bounty) => bounty.status === "IN_PROGRESS",
          ).length}
          description="Your ongoing work"
        />
        <StatCard
          icon={Wallet}
          tone="green"
          label="Total earnings"
          value="0.00"
          description="USDC earned"
        />
        <StatCard
          icon={CheckCircle2}
          tone="orange"
          label="Completed tasks"
          value={claimedBounties.filter(
            (bounty) => bounty.status === "COMPLETED",
          ).length}
          description="Successfully completed"
        />
      </section>

      {showBusinessActions && <HeroBanner onCreateBounty={onCreateBounty} />}
      <BountyExplorer
        bounties={
          isBusiness
            ? filteredBounties.filter((bounty) => bounty.createdBy === user.email)
            : filteredBounties
        }
        search={search}
        category={category}
        categories={categories}
        showViewAll
        onSearchChange={onSearchChange}
        onCategoryChange={onCategoryChange}
      />
      <footer className="footer">
        <span>© 2026 BOUNTEA</span>
        <span>Powered by opportunities. Built for everyone.</span>
      </footer>
    </div>
  );
}

export default Dashboard;
