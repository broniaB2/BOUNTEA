import { useMemo, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GuestRoute from "./components/auth/GuestRoute";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import BountyForm from "./components/bounties/BountyForm";
import MainLayout from "./components/layout/MainLayout";
import { emptyBountyForm } from "./data/bountyForm";
import { bountyCategories } from "./data/mockBounties";
import BountyDetails from "./pages/BountyDetails";
import Dashboard from "./pages/Dashboard";
import Marketplace from "./pages/Marketplace";
import MyTasks from "./pages/MyTasks";
import NotFound from "./pages/NotFound";
import Submissions from "./pages/Submissions";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import {
  createMockBounty,
  filterBounties,
  getInitialBounties,
  claimMockBounty,
  startMockTask,
  submitMockWork,
  resubmitMockWork,
  requestRevisionMock,
  approveMockSubmission,
} from "./services/bountyService";
import { initialSubmissions } from "./data/mockSubmissions";
import {
  getCurrentSession,
  mockLogout,
} from "./services/authService";

function App() {
  const [user, setUser] = useState(getCurrentSession);
  const [bounties, setBounties] = useState(getInitialBounties);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(emptyBountyForm);
  const [submissions, setSubmissions] = useState(initialSubmissions);

  const filteredBounties = useMemo(
    () => filterBounties(bounties, search, category),
    [bounties, search, category],
  );

  function createBounty(event) {
    event.preventDefault();
    setBounties((previous) => [
      createMockBounty(form, user),
      ...previous,
    ]);
    setForm(emptyBountyForm);
    setShowModal(false);
  }

  function claimBounty(id) {
    const result = claimMockBounty(bounties, id, user?.name);
    if (result.success) {
      setBounties((previous) =>
        previous.map((bounty) => (bounty.id === id ? result.bounty : bounty)),
      );
    }
    return result;
  }

  function startTask(id) {
    const result = startMockTask(bounties, id);
    if (result.success) {
      setBounties((previous) =>
        previous.map((bounty) => (bounty.id === id ? result.bounty : bounty)),
      );
    }
    return result;
  }

  function submitWork(id, submission) {
    const result = submitMockWork(bounties, id, submission);
    if (result.success) {
      setBounties((previous) =>
        previous.map((bounty) => (bounty.id === id ? result.bounty : bounty)),
      );
      setSubmissions((previous) => [...previous, result.submission]);
    }
    return result;
  }

  function resubmitWork(id, submission) {
    const result = resubmitMockWork(bounties, submissions, id, submission);
    if (result.success) {
      setBounties((previous) =>
        previous.map((bounty) => (bounty.id === id ? result.bounty : bounty)),
      );
      setSubmissions((previous) =>
        previous.map((item) =>
          item.id === result.submission.id ? result.submission : item,
        ),
      );
    }
    return result;
  }

  function requestRevision(submissionId, feedback) {
    const result = requestRevisionMock(
      bounties,
      submissions,
      submissionId,
      feedback,
    );
    if (result.success) {
      setBounties((previous) =>
        previous.map((bounty) =>
          bounty.id === result.bounty.id ? result.bounty : bounty,
        ),
      );
      setSubmissions((previous) =>
        previous.map((item) =>
          item.id === result.submission.id ? result.submission : item,
        ),
      );
    }
    return result;
  }

  function approveSubmission(submissionId) {
    const result = approveMockSubmission(
      bounties,
      submissions,
      submissionId,
    );
    if (result.success) {
      setBounties((previous) =>
        previous.map((bounty) =>
          bounty.id === result.bounty.id ? result.bounty : bounty,
        ),
      );
      setSubmissions((previous) =>
        previous.map((item) =>
          item.id === result.submission.id ? result.submission : item,
        ),
      );
    }
    return result;
  }

  const pageProps = {
    bounties,
    filteredBounties,
    search,
    category,
    categories: bountyCategories,
    onSearchChange: setSearch,
    onCategoryChange: setCategory,
    onCreateBounty: () => setShowModal(true),
    user,
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <GuestRoute user={user}>
              <Login onLogin={setUser} />
            </GuestRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <GuestRoute user={user}>
              <Signup onLogin={setUser} />
            </GuestRoute>
          }
        />
        <Route
          element={
            <ProtectedRoute user={user}>
              <MainLayout
                user={user}
                onLogout={() => {
                  mockLogout();
                  setUser(null);
                }}
                onCreateBounty={() => setShowModal(true)}
              />
            </ProtectedRoute>
          }
        >
          <Route
            path="/"
            element={
              <Dashboard
                {...pageProps}
                showBusinessActions={user?.role === "business"}
              />
            }
          />
          <Route
            path="/marketplace"
            element={<Marketplace {...pageProps} />}
          />
          <Route
            path="/marketplace/:id"
            element={
              <BountyDetails
                bounties={bounties}
                onClaimBounty={claimBounty}
                canClaim={user?.role === "worker"}
              />
            }
          />
          <Route
            path="/my-tasks"
            element={
              <ProtectedRoute user={user} allowedRoles={["worker"]}>
                <MyTasks
                  bounties={bounties}
                  submissions={submissions}
                  worker={user?.name}
                  onStartTask={startTask}
                  onSubmitWork={submitWork}
                  onResubmitWork={resubmitWork}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/submissions"
            element={
              <ProtectedRoute user={user} allowedRoles={["business"]}>
                <Submissions
                  bounties={bounties}
                  submissions={submissions}
                  user={user}
                  onApproveSubmission={approveSubmission}
                  onRequestRevision={requestRevision}
                />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      {showModal && (
        user?.role === "business" && (
          <BountyForm
            form={form}
            onChange={setForm}
            onSubmit={createBounty}
            onClose={() => setShowModal(false)}
          />
        )
      )}
    </BrowserRouter>
  );
}

export default App;
