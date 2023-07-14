import { useEffect } from "react";
import { signIn } from "next-auth/react";
import { NextPage } from "next";

const ClientPage: NextPage = () => {
  useEffect(() => {
    const signInWithCredentials = async () => {
      try {
        const res = await fetch(`${process.env.API_URL}/api/foundation/`);

        const jwt = await res.json();

        await signIn("credentials", {
          redirect: false,
          token: JSON.stringify(jwt),
        });
      } catch (error) {
        console.log(error);
      }
    };

    signInWithCredentials();
  }, []);

  return null;
};

ClientPage.getLayout = (page) => page;

export default ClientPage;
