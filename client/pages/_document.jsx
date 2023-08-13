import { Html, Head, Main, NextScript } from "next/document";
 
export default function Document() {
  return (
    <Html lang="en" className="bg-bg">
      <Head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#000000" />
        <link rel="icon" href="%PUBLIC_URL%/logo.svg" />
        <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo.svg" />
      </Head>
      <body className="flex flex-col min-h-screen h-screen container mx-auto px-4 md:px-12">
        <Main/>
        <NextScript />
      </body>
    </Html>
  );
}