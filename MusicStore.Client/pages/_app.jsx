import "styles/globals.css";
import Head from "next/head";
import Navbar from "components/Navbar/Navbar";
import Footer from "components/Footer";

export default function MyApp({ Component, pageProps }) {
  return (<>
    <Head>
      <title>{process.env.title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
    <Navbar />
    <main className="mb-auto grow">
      <Component {...pageProps} />
    </main>
    <Footer />
  </>);
}
