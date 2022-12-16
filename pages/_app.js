import { SessionProvider } from "next-auth/react"
import "../styles/globals.css";
import "../styles/cart.css";
import { AppProvider } from "../context/AppContext";
import { Layout } from "../components";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <AppProvider>
      <SessionProvider
      session={pageProps.session}
    >
        <Toaster />
        <Layout>
          <Component {...pageProps} />
        </Layout>
        </SessionProvider>
    </AppProvider>
  );
}

export default MyApp;

