"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

type OrganizationSettings = {
  name: string;
  legalName: string;
  email: string;
  phone: string;
  address: string;
  website: string;
  logoUrl: string;
};

type AccountSettings = {
  fullName: string;
  email: string;
  timezone: string;
  language: string;
};

const AVAILABLE_TIMEZONES = [
  "UTC",
  "Asia/Kolkata",
  "Europe/London",
  "America/New_York",
  "Australia/Sydney",
];

const AVAILABLE_LANGUAGES = ["English", "हिन्दी", "Deutsch", "Français", "Español"];

export default function SettingsPage() {
  const [organization, setOrganization] = useState<OrganizationSettings>({
    name: "Epic Solutions Pvt. Ltd.",
    legalName: "Epic Solutions Private Limited",
    email: "contact@epicsolutions.com",
    phone: "+91 98765 43210",
    address: "4th Floor, Innovate Towers, Bengaluru, Karnataka",
    website: "https://epicsolutions.com",
    logoUrl: "https://dummyimage.com/120x120/2563eb/ffffff&text=EP",
  });

  const [account, setAccount] = useState<AccountSettings>({
    fullName: "Admin User",
    email: "admin@epicsolutions.com",
    timezone: "Asia/Kolkata",
    language: "English",
  });

  const [themeMode, setThemeMode] = useState<"light" | "dark" | "system">("light");
  const [isSavingOrg, setSavingOrg] = useState(false);
  const [isSavingAccount, setSavingAccount] = useState(false);

  const handleOrgSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSavingOrg(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setSavingOrg(false);
    alert("Organization settings saved (mock).");
  };

  const handleAccountSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSavingAccount(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setSavingAccount(false);
    alert("Account settings updated (mock).");
  };

  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold text-gray-900 dark:text-gray-100">Settings</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Update organization profile, manage theme preferences, and keep your admin account details up to date.
        </p>
      </header>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <div className="space-y-6">
          <Card title="Organization Profile" description="Keep your company details accurate across communications">
            <form className="space-y-4" onSubmit={handleOrgSubmit}>
              <div className="flex items-center gap-4">
                <img
                  src={organization.logoUrl}
                  alt="Organization logo"
                  className="h-16 w-16 rounded-full border border-gray-200 object-cover dark:border-gray-700"
                />
                <div className="flex flex-col gap-2 text-sm text-gray-600 dark:text-gray-300">
                  <span className="font-medium text-gray-700 dark:text-gray-200">Organization Logo</span>
                  <p className="max-w-xs text-xs text-gray-500 dark:text-gray-400">
                    Replace with a square PNG or SVG to reflect branding inside the admin portal.
                  </p>
                  <Button type="button" onClick={() => alert("Logo uploader pending implementation.")}>
                    Upload New Logo
                  </Button>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Input
                  label="Display Name"
                  value={organization.name}
                  onChange={(event) => setOrganization((state) => ({ ...state, name: event.target.value }))}
                  required
                />
                <Input
                  label="Legal Name"
                  value={organization.legalName}
                  onChange={(event) => setOrganization((state) => ({ ...state, legalName: event.target.value }))}
                  required
                />
                <Input
                  label="Contact Email"
                  type="email"
                  value={organization.email}
                  onChange={(event) => setOrganization((state) => ({ ...state, email: event.target.value }))}
                  required
                />
                <Input
                  label="Phone"
                  value={organization.phone}
                  onChange={(event) => setOrganization((state) => ({ ...state, phone: event.target.value }))}
                />
              </div>

              <label className="flex flex-col gap-2 text-sm text-gray-600 dark:text-gray-300">
                <span className="font-medium text-gray-700 dark:text-gray-200">Registered Address</span>
                <textarea
                  rows={3}
                  value={organization.address}
                  onChange={(event) => setOrganization((state) => ({ ...state, address: event.target.value }))}
                  className="rounded-md border border-gray-200 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                  placeholder="Street, city, state, postal code"
                />
              </label>

              <Input
                label="Website"
                type="url"
                value={organization.website}
                onChange={(event) => setOrganization((state) => ({ ...state, website: event.target.value }))}
              />

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => alert("Discarding changes is not wired to backend in this demo.")}
                  className="rounded-md border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
                >
                  Cancel
                </button>
                <Button type="submit" disabled={isSavingOrg}>
                  {isSavingOrg ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </form>
          </Card>

          <Card title="Account Preferences" description="Update personal contact settings for your admin account">
            <form className="space-y-4" onSubmit={handleAccountSubmit}>
              <Input
                label="Full Name"
                value={account.fullName}
                onChange={(event) => setAccount((state) => ({ ...state, fullName: event.target.value }))}
                required
              />
              <Input
                label="Email"
                type="email"
                value={account.email}
                onChange={(event) => setAccount((state) => ({ ...state, email: event.target.value }))}
                required
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="flex flex-col gap-2 text-sm text-gray-600 dark:text-gray-300">
                  <span className="font-medium text-gray-700 dark:text-gray-200">Timezone</span>
                  <select
                    value={account.timezone}
                    onChange={(event) => setAccount((state) => ({ ...state, timezone: event.target.value }))}
                    className="rounded-md border border-gray-200 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                  >
                    {AVAILABLE_TIMEZONES.map((timezone) => (
                      <option key={timezone} value={timezone}>
                        {timezone}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="flex flex-col gap-2 text-sm text-gray-600 dark:text-gray-300">
                  <span className="font-medium text-gray-700 dark:text-gray-200">Language</span>
                  <select
                    value={account.language}
                    onChange={(event) => setAccount((state) => ({ ...state, language: event.target.value }))}
                    className="rounded-md border border-gray-200 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                  >
                    {AVAILABLE_LANGUAGES.map((language) => (
                      <option key={language} value={language}>
                        {language}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="space-y-3">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Security</span>
                <div className="rounded-lg border border-gray-200 p-3 text-sm text-gray-600 dark:border-gray-700 dark:text-gray-300">
                  Multi-factor authentication is enabled for this account. Manage security options from the dedicated
                  security center (coming soon).
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => alert("Password reset flow pending backend integration.")}
                  className="rounded-md border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
                >
                  Reset Password
                </button>
                <Button type="submit" disabled={isSavingAccount}>
                  {isSavingAccount ? "Saving..." : "Save Preferences"}
                </Button>
              </div>
            </form>
          </Card>
        </div>

        <aside className="space-y-4">
          <Card title="Theme Mode" description="Choose how the interface adapts to lighting">
            <div className="space-y-3">
              {["light", "dark", "system"].map((mode) => (
                <label
                  key={mode}
                  className={`flex items-center justify-between rounded-lg border px-3 py-2 text-sm transition ${
                    themeMode === mode
                      ? "border-blue-500 bg-blue-50 text-blue-600 dark:border-blue-400/80 dark:bg-blue-500/10 dark:text-blue-200"
                      : "border-gray-200 text-gray-600 dark:border-gray-700 dark:text-gray-300"
                  }`}
                >
                  <span className="capitalize">{mode}</span>
                  <input
                    type="radio"
                    name="themeMode"
                    value={mode}
                    checked={themeMode === mode}
                    onChange={() => setThemeMode(mode as typeof themeMode)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                </label>
              ))}
              <Button type="button" onClick={() => alert(`Theme mode switched to ${themeMode}.`)}>
                Apply Theme
              </Button>
            </div>
          </Card>

          <Card title="Notification Preferences" description="Control alerts sent to your email">
            <div className="space-y-4 text-sm text-gray-600 dark:text-gray-300">
              <label className="flex items-center justify-between gap-2">
                <span>Weekly summary</span>
                <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
              </label>
              <label className="flex items-center justify-between gap-2">
                <span>Critical alerts</span>
                <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
              </label>
              <label className="flex items-center justify-between gap-2">
                <span>New feature updates</span>
                <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
              </label>
            </div>
          </Card>

          <Card title="Data &amp; Privacy" description="Manage export and visibility options">
            <div className="space-y-4 text-sm text-gray-600 dark:text-gray-300">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Export your organization data in CSV or JSON format. Request deletion to comply with data retention
                policies.
              </p>
              <div className="flex flex-col gap-2">
                <Button type="button" onClick={() => alert("Export in progress (mock).")}>Export Data</Button>
                <Button
                  type="button"
                  onClick={() => alert("Data deletion request submitted (mock).")}
                  className="bg-red-600 hover:bg-red-500 focus:ring-red-400"
                >
                  Request Deletion
                </Button>
              </div>
            </div>
          </Card>
        </aside>
      </section>
    </section>
  );
}
