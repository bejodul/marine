// ** React Imports
import { ReactNode, ReactElement, useEffect } from "react";

// ** Next Import
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

// ** Default AuthConfig
import defaultAuthConfig from "src/configs/auth";
import { SessionExtended } from "src/types/session/sessionType";

interface NextAuthGuardProps {
  children: ReactNode;
  fallback: ReactElement | null;
}

const NextAuthGuard = (props: NextAuthGuardProps) => {
  const { children, fallback } = props;
  const router = useRouter();
  const urlLogin = "/api/auth/signin";

  const { data: session, status } = useSession();
  const sessionExtended: SessionExtended = session;

  useEffect(
    () => {
      if (!router.isReady) {
        return;
      }

      if (status === "unauthenticated") {
        if (router.asPath !== "/") {
          router.replace({
            pathname: urlLogin,
            query: { returnUrl: router.asPath },
          });
        } else {
          router.replace(urlLogin);
        }
      } else if (
        status === "authenticated" &&
        !window.localStorage.getItem("userData")
      ) {
        // ** Set new token in localStorage
        window.localStorage.setItem(
          defaultAuthConfig.storageTokenKeyName,
          sessionExtended.accessToken
        );

        window.localStorage.setItem(
          "userData",
          JSON.stringify({
            id: 1,
            role: "admin",
            fullName: "John Doe",
            username: "johndoe",
            email: "admin@materio.com",
          })
        );
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.route, session]
  );

  if (status === "loading") {
    return fallback;
  }

  return <>{children}</>;
};

export default NextAuthGuard;
