import "../styles/globals.css";
import "../styles/cart.css";
import { AppProvider } from "../context/AppContext";
import { Layout } from "../components";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <AppProvider>
      <SessionProvider session={session}>
        <Toaster />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </AppProvider>
  );
}

export default MyApp;

