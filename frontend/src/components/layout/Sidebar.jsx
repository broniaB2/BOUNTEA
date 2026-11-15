import {
  BriefcaseBusiness,
  Compass,
  FileText,
  LayoutDashboard,
  Plus,
  Sparkles,
  X,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const navigation = [
  { label: "Dashboard", path: "/", icon: LayoutDashboard },
  { label: "Marketplace", path: "/marketplace", icon: Compass },
  { label: "My Tasks", path: "/my-tasks", icon: BriefcaseBusiness },
  { label: "Submissions", path: "/submissions", icon: FileText },
];

function Sidebar({ mobileMenu, onClose, onCreateBounty }) {
  return (
    <aside className={`sidebar ${mobileMenu ? "mobile-open" : ""}`}>
      <div className="brand">
        <div className="brand-icon">
          <Sparkles size={23} />
        </div>
        <div>
          <h2>BOUNTEA</h2>
          <span>Work. Earn. Grow.</span>
        </div>
        <button className="mobile-close" onClick={onClose} aria-label="Close menu">
          <X size={20} />
        </button>
      </div>

      <div className="sidebar-section">
        <p className="sidebar-label">WORKSPACE</p>
        {navigation.map(({ label, path, icon: Icon }) => (
          <NavLink
            key={label}
            to={path}
            end={path === "/"}
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : ""}`
            }
            onClick={onClose}
          >
            <Icon size={19} />
            <span>{label}</span>
          </NavLink>
        ))}
      </div>

      <div className="sidebar-section">
        <p className="sidebar-label">BUSINESS</p>
        <button className="nav-link" onClick={onCreateBounty}>
          <Plus size={19} />
          <span>Create Bounty</span>
        </button>
      </div>

      <div className="sidebar-bottom">
        <div className="help-card">
          <Sparkles size={20} />
          <h4>Have a task to complete?</h4>
          <p>Discover opportunities and turn your skills into income.</p>
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
  );
}

export default Sidebar;
