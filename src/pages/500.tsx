import type { GetStaticProps } from "next";

import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import AppLayout from "@/components/layouts/AppLayout";
import Seo from "@/components/layouts/Seo";

import Button from "@/components/atoms/buttons/Button";

// The props for the 500 page
type Props = {};

// The 500 page
export default function Error500({}: Props) {
  const router = useRouter(); // Get the router

  const { t } = useTranslation(); // Get the translation function

  return (
    <>
      <Seo title={t("Internal Error") || undefined} />
      <AppLayout>
        <div>{t("Internal Error")}</div>
        <div>
          <Button
            color={"primary"}
            className={"my-2"}
            clickHandler={() => {
              router.push("/");
            }}
          >
            {t("Back to homepage")}
          </Button>
        </div>
      </AppLayout>
    </>
  );
}

// Get the translations
export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "en", ["common"])),
  },
});
