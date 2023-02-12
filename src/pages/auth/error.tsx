import type { GetServerSidePropsContext } from "next";

import { getProviders, useSession } from "next-auth/react";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import SignIn from "./signin";
import { useEffect } from "react";
import { useRouter } from "next/router";

// The props for the error page
type Props = {
  providers: any[];
};

// The error page
export default function Error({ providers }: Props) {
  const router = useRouter(); // Get the router

  const { status } = useSession(); // Get the session

  // If the user is authenticated, redirect to the housekeeping page
  useEffect(() => {
    if (status == "authenticated") {
      router.push("/housekeeping");
    }
  }, [status, router]);

  // If the session is loading, return an empty fragment
  if (status == "loading" || status == "authenticated") {
    return <></>;
  }

  // Return the sign in page
  return (
    <>
      <SignIn providers={providers} hasError={true} />
    </>
  );
}

// Get the providers and translations
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const providers: any = await getProviders();

  return {
    props: {
      providers: Object.values(providers) ?? [],
      ...(await serverSideTranslations(context.locale as string, [
        "common",
        "auth",
      ])),
    },
  };
}
