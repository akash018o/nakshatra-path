import { createContext, useContext, useEffect, useState } from "react";
import { fetchSettings, DEFAULT_SETTINGS } from "../lib/settings";

const SettingsContext = createContext(null);

export function SettingsProvider({ children }) {
  // Start with the hardcoded defaults so the site is fully usable instantly;
  // swap in the live values once (and if) they load, with no visible flash
  // since the defaults are the same numbers until an admin changes them.
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);

  useEffect(() => {
    fetchSettings().then(setSettings).catch(() => {
      // Supabase not configured / offline — defaults already in state.
    });
  }, []);

  return (
    <SettingsContext.Provider value={{ settings, setSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be used inside <SettingsProvider>");
  return ctx.settings;
}

// Used only by the admin panel, to update the shared value the instant it saves.
export function useSettingsSetter() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettingsSetter must be used inside <SettingsProvider>");
  return ctx.setSettings;
}
