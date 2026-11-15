import { initialBounties } from "../data/mockBounties";

export function getInitialBounties() {
  return initialBounties;
}

export function filterBounties(bounties, search, category) {
  const normalizedSearch = search.trim().toLowerCase();

  return bounties.filter((bounty) => {
    const matchesSearch =
      bounty.title.toLowerCase().includes(normalizedSearch) ||
      bounty.description.toLowerCase().includes(normalizedSearch);
    const matchesCategory =
      category === "All" || bounty.category === category;

    return matchesSearch && matchesCategory;
  });
}

export function createMockBounty(form) {
  return {
    id: Date.now(),
    ...form,
    reward: Number(form.reward),
    skills: [form.category],
    business: "Your Business",
    status: "OPEN",
  };
}
