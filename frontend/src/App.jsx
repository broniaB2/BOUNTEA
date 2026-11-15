import { useMemo, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import BountyForm from "./components/bounties/BountyForm";
import MainLayout from "./components/layout/MainLayout";
import { emptyBountyForm } from "./data/bountyForm";
import { bountyCategories } from "./data/mockBounties";
import Dashboard from "./pages/Dashboard";
import Marketplace from "./pages/Marketplace";
import MyTasks from "./pages/MyTasks";
import NotFound from "./pages/NotFound";
import Submissions from "./pages/Submissions";
import {
  createMockBounty,
  filterBounties,
  getInitialBounties,
} from "./services/bountyService";

function App() {
  const [bounties, setBounties] = useState(getInitialBounties);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(emptyBountyForm);

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
          <Route path="/my-tasks" element={<MyTasks />} />
          <Route path="/submissions" element={<Submissions />} />
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
