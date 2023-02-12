import { useEffect } from "react";

import { GetServerSidePropsContext } from "next";

import { useTranslation } from "react-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import AppLayout from "@/components/layouts/AppLayout";
import Seo from "@/components/layouts/Seo";

// The props for the index page
type Props = {};

// The index page
export default function Index({}: Props) {
  const router = useRouter(); // Get the router

  const { t } = useTranslation(); // Get the translation function

  const { status } = useSession(); // Get the session

  // If the user is not authenticated, redirect to the homepage
  useEffect(() => {
    if (status == "authenticated") {
      router.push("/housekeeping");
    }
  }, [status]);

  // If the session is loading, return an empty fragment
  if (status == "loading" || status == "authenticated") {
    return <></>;
  }

  // Return the index page
  return (
    <>
      <Seo title={"App"} />
      <AppLayout>
        <div className="mb-2">{t("Not signed in.")}</div>
      </AppLayout>
    </>
  );
}

// Get the translations
export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(context.locale ?? "en", ["common"])),
    },
  };
}
