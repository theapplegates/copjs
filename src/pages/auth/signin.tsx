import { useEffect } from "react";
import { useRouter } from "next/router";

import type { GetServerSidePropsContext } from "next";

import { useTranslation } from "next-i18next";

import { FaDiscord } from "react-icons/fa";
import { getProviders, signIn, useSession } from "next-auth/react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import Button from "@/components/atoms/buttons/Button";
import Seo from "@/components/layouts/Seo";
import BaseLayout from "@/components/layouts/BaseLayout";

// The props for the sign in page
type Props = {
  providers: any[];
  hasError?: boolean;
};

// The sign in page
export default function SignIn({ providers, hasError }: Props) {
  const router = useRouter(); // Get the router

  const { t } = useTranslation(); // Get the translation function

  const { status } = useSession(); // Get the session

  useEffect(() => {
    // If the user is authenticated
    if (status == "authenticated") {
      // Redirect to the housekeeping page
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
      <Seo title={t("Sign in") || undefined} />

      <BaseLayout>
        <div className="flex justify-center items-center w-full h-full">
          <div>
            {hasError && <>{t("Authentication failed.")}</>}
            {Object.values(providers).map((provider: any) => (
              <div key={provider.name}>
                <Button
                  color="cornflower-blue"
                  clickHandler={() => signIn(provider.id)}
                  icon={
                    (provider.id == "discord" && <FaDiscord size={24} />) ||
                    null
                  }
                >
                  {t("Sign in with {{provider}}", { provider: provider.name })}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </BaseLayout>
    </>
  );
}

// Get the server side props
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const providers: any = await getProviders();

  return {
    props: {
      providers: Object.values(providers) ?? [],
      ...(await serverSideTranslations(context.locale ?? "en", ["common"])),
    },
  };
}
