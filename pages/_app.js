import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";
import "../styles/cart.css";
import { AppProvider } from "../context/AppContext";
import { Layout } from "../components";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  useEffect(() => {
    const use = async () => {
      (await import("tw-elements")).default;
    };
    use();
  }, []);

  return (
    <AppProvider>
      <SessionProvider session={pageProps.session}>
        <Toaster />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </AppProvider>
  );
}

export default MyApp;
