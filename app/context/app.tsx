import React, { createContext, useState } from "react";

type Theme = "light" | "dark";
type Severity = "success" | "error" | "info";

interface Alert {
  message: string;
  open: boolean;
  severity: Severity;
}

interface Context {
  theme: Theme | undefined;
  alert: Alert | undefined;
  setTheme: (theme: Theme) => void;
  setAlert: (alert: Alert) => void;
}
const defaultContext: Partial<Context> = {
  theme: "light",
  alert: {
    message: "",
    open: false,
    severity: "success",
  },
};
export const ContextApp = createContext<Context | undefined>(undefined);
export default function AppContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const [value, setValue] = useState(defaultContext);
  return (
    <ContextApp.Provider
      value={{
        theme: value.theme,
        alert: value.alert,
        setTheme: (theme: Theme) => setValue({ ...value, theme }),
        setAlert: (alert: Alert) => setValue({ ...value, alert }),
      }}
    >
      {children}
    </ContextApp.Provider>
  );
}
