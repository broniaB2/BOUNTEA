import { useState } from "react";

import {
  LayoutDashboard,
  Compass,
  BriefcaseBusiness,
  FileText,
  Plus,
  Search,
  Bell,
  ArrowUpRight,
  Clock3,
  Users,
  Wallet,
  Sparkles,
  Menu,
  X,
  CheckCircle2,
} from "lucide-react";

import "./App.css";

const initialBounties = [
  {
    id: 1,
    title: "Translate product descriptions into Luganda",
    description:
      "Help a local fashion business translate product descriptions for its online store.",
    category: "Translation",
    reward: 5,
    deadline: "2 days",
    skills: ["Luganda", "Translation", "Writing"],
    business: "Kampala Fashion Hub",
    status: "OPEN",
  },
  {
    id: 2,
    title: "Clean and organise sales records",
    description:
      "Organise monthly sales records and prepare a structured spreadsheet.",
    category: "Data",
    reward: 12,
    deadline: "3 days",
    skills: ["Excel", "Data Entry"],
    business: "Mirembe Stores",
    status: "OPEN",
  },
  {
    id: 3,
    title: "Research competitors in the beauty industry",
    description:
      "Research five competitors and summarise their products and pricing.",
    category: "Research",
    reward: 15,
    deadline: "5 days",
    skills: ["Research", "Analysis"],
    business: "Glow Beauty Uganda",
    status: "OPEN",
  },
  {
    id: 4,
    title: "Create social media product captions",
    description:
      "Write engaging captions for ten product posts.",
    category: "Content",
    reward: 8,
    deadline: "2 days",
    skills: ["Writing", "Social Media"],
    business: "Her Essentials",
    status: "OPEN",
  },
];

function App() {
  const [activePage, setActivePage] = useState("Marketplace");
  const [bounties, setBounties] = useState(initialBounties);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const [showModal, setShowModal] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "Research",
    reward: "",
    deadline: "",
  });

  const categories = [
    "All",
    "Translation",
    "Data",
    "Research",
    "Content",
  ];

  const filteredBounties = bounties.filter((bounty) => {
    const matchesSearch =
      bounty.title.toLowerCase().includes(search.toLowerCase()) ||
      bounty.description.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || bounty.category === category;

    return matchesSearch && matchesCategory;
  });

  function createBounty(event) {
    event.preventDefault();

    const newBounty = {
      id: Date.now(),
      ...form,
      reward: Number(form.reward),
      skills: [form.category],
      business: "Your Business",
      status: "OPEN",
    };

    setBounties((previous) => [newBounty, ...previous]);

    setForm({
      title: "",
      description: "",
      category: "Research",
      reward: "",
      deadline: "",
    });

    setShowModal(false);
    setActivePage("Marketplace");
  }

  function SidebarLink({ icon: Icon, label }) {
    return (
      <button
        className={`nav-link ${
          activePage === label ? "active" : ""
        }`}
        onClick={() => {
          setActivePage(label);
          setMobileMenu(false);
        }}
      >
        <Icon size={19} />
        <span>{label}</span>
      </button>
    );
  }

  return (
    <div className="app-container">

      {/* SIDEBAR */}

      <aside className={`sidebar ${mobileMenu ? "mobile-open" : ""}`}>

        <div className="brand">
          <div className="brand-icon">
            <Sparkles size={23} />
          </div>

          <div>
            <h2>BOUNTEA</h2>
            <span>Work. Earn. Grow.</span>
          </div>

          <button
            className="mobile-close"
            onClick={() => setMobileMenu(false)}
          >
            <X size={20} />
          </button>
        </div>

        <div className="sidebar-section">
          <p className="sidebar-label">WORKSPACE</p>

          <SidebarLink
            icon={LayoutDashboard}
            label="Dashboard"
          />

          <SidebarLink
            icon={Compass}
            label="Marketplace"
          />

          <SidebarLink
            icon={BriefcaseBusiness}
            label="My Tasks"
          />

          <SidebarLink
            icon={FileText}
            label="Submissions"
          />
        </div>

        <div className="sidebar-section">
          <p className="sidebar-label">BUSINESS</p>

          <button
            className="nav-link"
            onClick={() => setShowModal(true)}
          >
            <Plus size={19} />
            <span>Create Bounty</span>
          </button>
        </div>

        <div className="sidebar-bottom">

          <div className="help-card">
            <Sparkles size={20} />

            <h4>Have a task to complete?</h4>

            <p>
              Discover opportunities and turn your skills into income.
            </p>
          </div>

          <div className="profile">
            <div className="avatar">P</div>

            <div>
              <strong>Precious</strong>
              <span>Worker Account</span>
            </div>
          </div>

        </div>

      </aside>

      {/* MAIN CONTENT */}

      <main className="main-content">

        {/* TOPBAR */}

        <header className="topbar">

          <button
            className="mobile-menu"
            onClick={() => setMobileMenu(true)}
          >
            <Menu size={22} />
          </button>

          <div className="breadcrumb">
            Workspace <span>/</span> {activePage}
          </div>

          <div className="topbar-actions">

            <button className="icon-button">
              <Bell size={19} />
              <span className="notification-dot"></span>
            </button>

            <div className="topbar-profile">
              <div className="avatar">P</div>
              <span>Precious</span>
            </div>

          </div>

        </header>

        {/* PAGE CONTENT */}

        <div className="page-content">

          <div className="welcome-row">

            <div>
              <p className="eyebrow">YOUR OPPORTUNITY STARTS HERE</p>

              <h1>
                {activePage === "Marketplace"
                  ? "Explore opportunities"
                  : activePage}
              </h1>

              <p className="page-description">
                Discover meaningful work, complete tasks and earn through
                autonomous payments on Stellar.
              </p>
            </div>

            <button
              className="primary-button"
              onClick={() => setShowModal(true)}
            >
              <Plus size={18} />
              Create bounty
            </button>

          </div>

          {/* STATISTICS */}

          <section className="stats-grid">

            <div className="stat-card">
              <div className="stat-icon purple">
                <Compass size={21} />
              </div>

              <div>
                <p>Available bounties</p>
                <h2>{bounties.length}</h2>
                <span>Opportunities to explore</span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon blue">
                <BriefcaseBusiness size={21} />
              </div>

              <div>
                <p>Active tasks</p>
                <h2>0</h2>
                <span>Your ongoing work</span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon green">
                <Wallet size={21} />
              </div>

              <div>
                <p>Total earnings</p>
                <h2>0.00</h2>
                <span>USDC earned</span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon orange">
                <CheckCircle2 size={21} />
              </div>

              <div>
                <p>Completed tasks</p>
                <h2>0</h2>
                <span>Successfully completed</span>
              </div>
            </div>

          </section>

          {/* HERO */}

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
                Connect businesses with skilled people and AI agents.
                Complete meaningful work and get paid through Stellar.
              </p>

              <button
                className="hero-button"
                onClick={() => setShowModal(true)}
              >
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

          {/* MARKETPLACE */}

          <section className="marketplace-section">

            <div className="section-heading">

              <div>
                <h2>Discover bounties</h2>
                <p>Find tasks that match your skills.</p>
              </div>

              <button className="text-button">
                View all <ArrowUpRight size={16} />
              </button>

            </div>

            {/* SEARCH */}

            <div className="filter-row">

              <div className="search-box">
                <Search size={19} />

                <input
                  type="text"
                  placeholder="Search for tasks..."
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                />
              </div>

              <div className="category-filters">

                {categories.map((item) => (
                  <button
                    key={item}
                    className={`filter-button ${
                      category === item ? "selected" : ""
                    }`}
                    onClick={() => setCategory(item)}
                  >
                    {item}
                  </button>
                ))}

              </div>

            </div>

            {/* BOUNTY CARDS */}

            <div className="bounty-grid">

              {filteredBounties.map((bounty) => (

                <article className="bounty-card" key={bounty.id}>

                  <div className="bounty-card-top">

                    <span className="category-tag">
                      {bounty.category}
                    </span>

                    <span className="status-tag">
                      {bounty.status}
                    </span>

                  </div>

                  <h3>{bounty.title}</h3>

                  <p className="bounty-description">
                    {bounty.description}
                  </p>

                  <div className="skill-list">

                    {bounty.skills.map((skill) => (
                      <span key={skill}>{skill}</span>
                    ))}

                  </div>

                  <div className="bounty-business">
                    <div className="business-avatar">
                      {bounty.business.charAt(0)}
                    </div>

                    <span>{bounty.business}</span>
                  </div>

                  <div className="bounty-footer">

                    <div className="reward">
                      <strong>
                        ${Number(bounty.reward).toFixed(2)}
                      </strong>

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
                        `You selected: ${bounty.title}\n\nTask details and claiming will be implemented in the next stage.`
                      )
                    }
                  >
                    View bounty <ArrowUpRight size={16} />
                  </button>

                </article>

              ))}

            </div>

            {filteredBounties.length === 0 && (

              <div className="empty-state">
                <Search size={35} />

                <h3>No bounties found</h3>

                <p>Try another search term or category.</p>
              </div>

            )}

          </section>

          <footer className="footer">
            <span>© 2026 BOUNTEA</span>
            <span>Powered by opportunities. Built for everyone.</span>
          </footer>

        </div>

      </main>

      {/* CREATE BOUNTY MODAL */}

      {showModal && (

        <div className="modal-overlay">

          <div className="modal">

            <div className="modal-header">

              <div>
                <h2>Create a bounty</h2>
                <p>Publish a new opportunity on BOUNTEA.</p>
              </div>

              <button
                className="icon-button"
                onClick={() => setShowModal(false)}
              >
                <X size={20} />
              </button>

            </div>

            <form onSubmit={createBounty}>

              <label>Task title</label>

              <input
                required
                placeholder="e.g. Translate product descriptions"
                value={form.title}
                onChange={(event) =>
                  setForm({ ...form, title: event.target.value })
                }
              />

              <label>Description</label>

              <textarea
                required
                placeholder="Describe the work that needs to be completed..."
                value={form.description}
                onChange={(event) =>
                  setForm({ ...form, description: event.target.value })
                }
              />

              <label>Category</label>

              <select
                value={form.category}
                onChange={(event) =>
                  setForm({ ...form, category: event.target.value })
                }
              >
                <option>Research</option>
                <option>Translation</option>
                <option>Data</option>
                <option>Content</option>
              </select>

              <div className="form-row">

                <div>
                  <label>Reward (USDC)</label>

                  <input
                    required
                    type="number"
                    min="0.01"
                    step="0.01"
                    placeholder="5.00"
                    value={form.reward}
                    onChange={(event) =>
                      setForm({ ...form, reward: event.target.value })
                    }
                  />
                </div>

                <div>
                  <label>Deadline</label>

                  <input
                    required
                    placeholder="e.g. 2 days"
                    value={form.deadline}
                    onChange={(event) =>
                      setForm({ ...form, deadline: event.target.value })
                    }
                  />
                </div>

              </div>

              <button type="submit" className="primary-button submit-button">
                Create bounty <Plus size={17} />
              </button>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}

export default App;