import { useMemo, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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

function App() {
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
    setBounties((previous) => [createMockBounty(form), ...previous]);
    setForm(emptyBountyForm);
    setShowModal(false);
  }

  function claimBounty(id) {
    const result = claimMockBounty(bounties, id);
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
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <MainLayout onCreateBounty={() => setShowModal(true)} />
          }
        >
          <Route path="/" element={<Dashboard {...pageProps} />} />
          <Route path="/marketplace" element={<Marketplace {...pageProps} />} />
          <Route
            path="/marketplace/:id"
            element={
              <BountyDetails
                bounties={bounties}
                onClaimBounty={claimBounty}
              />
            }
          />
          <Route
            path="/my-tasks"
            element={
              <MyTasks
                bounties={bounties}
                submissions={submissions}
                onStartTask={startTask}
                onSubmitWork={submitWork}
                onResubmitWork={resubmitWork}
              />
            }
          />
          <Route
            path="/submissions"
            element={
              <Submissions
                bounties={bounties}
                submissions={submissions}
                onApproveSubmission={approveSubmission}
                onRequestRevision={requestRevision}
              />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      {showModal && (
        <BountyForm
          form={form}
          onChange={setForm}
          onSubmit={createBounty}
          onClose={() => setShowModal(false)}
        />
      )}
    </BrowserRouter>
  );
}

export default App;
