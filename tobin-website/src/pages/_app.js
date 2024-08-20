// pages/_app.js
import '../styles/globals.css';
import Head from 'next/head';

function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Tobin South's Website</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="shortcut icon" type="image/x-icon" href="/images/kangaroo.ico" />
      </Head>
      <div className="container mx-auto px-4 max-w-5xl">
        {children}
      </div>
    </>
  );
}

export default function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}