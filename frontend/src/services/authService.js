const SESSION_KEY = "bountea.mock.session";

const mockUsers = new Map();

function normalizeEmail(email) {
  return email.trim().toLowerCase();
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function toProfile(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
}

export function getCurrentSession() {
  try {
    const storedSession = window.localStorage.getItem(SESSION_KEY);
    return storedSession ? JSON.parse(storedSession) : null;
  } catch {
    return null;
  }
}

function saveSession(profile) {
  window.localStorage.setItem(SESSION_KEY, JSON.stringify(profile));
  return profile;
}

export function mockSignUp({ name, email, password, role }) {
  const normalizedEmail = normalizeEmail(email);

  if (!name.trim() || !isValidEmail(normalizedEmail) || password.length < 8) {
    return { success: false, error: "Please provide valid account details." };
  }

  if (!["worker", "business"].includes(role)) {
    return { success: false, error: "Choose a valid account type." };
  }

  if (mockUsers.has(normalizedEmail)) {
    return { success: false, error: "An account with this email already exists." };
  }

  const user = {
    id: `mock-user-${Date.now()}`,
    name: name.trim(),
    email: normalizedEmail,
    password,
    role,
  };
  mockUsers.set(normalizedEmail, user);

  return { success: true, profile: saveSession(toProfile(user)) };
}

export function mockLogin({ email, password }) {
  const normalizedEmail = normalizeEmail(email);
  const user = mockUsers.get(normalizedEmail);

  if (!isValidEmail(normalizedEmail) || !password) {
    return { success: false, error: "Enter a valid email and password." };
  }

  if (!user || user.password !== password) {
    return { success: false, error: "The email or password is incorrect." };
  }

  return { success: true, profile: saveSession(toProfile(user)) };
}

export function mockLogout() {
  window.localStorage.removeItem(SESSION_KEY);
}
