import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

import { signOut, useSession } from "next-auth/react";

import { useTheme } from "@/providers/ThemeProvider";

import Title from "../atoms/typography/Title";
import Subtitle from "../atoms/typography/Subtitle";
import Button from "../atoms/buttons/Button";

import { MdOutlineLight, MdOutlineDarkMode } from "react-icons/md";

// The props for the app layout
type Props = {
  children?: React.ReactNode;
};

// The app layout
export default function AppLayout({ children }: Props) {
  const { t } = useTranslation(); // Get the translation function

  const { data: session } = useSession(); // Get the session

  const router = useRouter(); // Get the router

  const { theme, toggleTheme } = useTheme(); // Get the theme

  // Return the app layout
  return (
    <div className="h-full w-full bg-white dark:(bg-gray-900 text-white)">
      <div className="flex w-full">
        <div className="w-[250px] py-6 px-10">
          <div className="text-2xl font-bold">LOGO</div>
        </div>
        <div className="pt-12 pb-6 px-10 w-full">
          <div className="grid grid-cols-2 gap-2">
            <div>
              {session && (
                <>
                  <Title className="mb-1">{t("Dashboard")}</Title>
                  <Subtitle>
                    {t("Welcome, {{name}}!", {
                      name: session.user.name,
                    })}
                  </Subtitle>
                  {session.user.role}
                </>
              )}
            </div>
            <div className="text-right">
              <div className="flex gap-2 justify-end">
                <Button clickHandler={() => toggleTheme()}>
                  {theme == "dark" ? <MdOutlineDarkMode /> : <MdOutlineLight />}
                </Button>
                {session ? (
                  <Button
                    clickHandler={() => {
                      signOut({
                        callbackUrl: `/${router.locale || ""}`,
                        redirect: true,
                      });
                    }}
                  >
                    {t("Sign out")}
                  </Button>
                ) : (
                  <Button
                    clickHandler={() => {
                      router.push(`/auth/signin`);
                    }}
                  >
                    {t("Sign in")}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full">
        <div className="w-[250px] py-6 px-10">
          <Button className="w-full mb-3">{t("Dashboard")}</Button>
        </div>
        <div className="py-6 px-4">
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
}
