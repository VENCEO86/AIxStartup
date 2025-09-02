export type Settings = {
  user: { id: string; email: string };
  org?: { id: string; name: string };
  features: { abac: boolean; rbac: boolean; policyHotReload: boolean };
  theme: "light" | "dark" | "system";
};

export const mockSettings: Settings = {
  user: { id: "mock-user", email: "mock@example.com" },
  org: { id: "mock-org", name: "Demo Org" },
  features: { abac: true, rbac: true, policyHotReload: true },
  theme: "system",
};
