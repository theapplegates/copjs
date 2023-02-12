import "windi.css";
import "../styles/globals.css";

import type { AppProps } from "next/app";

import { SessionProvider } from "next-auth/react";

import { appWithTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import { ThemeProvider } from "@/providers/ThemeProvider";

// The app
const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  const [initialRenderComplete, setInitialRenderComplete] =
    useState<boolean>(false);

  // Wait for the initial render to complete
  useEffect(() => {
    setInitialRenderComplete(true); // Set the initial render to complete
  }, []);

  // If the initial render is not complete, return an empty fragment
  if (!initialRenderComplete) return <></>;

  // Return the app
  return (
    <SessionProvider session={session}>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  );
};

// Export the app with translations
export default appWithTranslation(App);
