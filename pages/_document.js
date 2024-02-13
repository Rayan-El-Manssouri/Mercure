import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="fr" className='selection:bg-purple-500 selection:text-white'>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}