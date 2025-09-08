import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { NextIntlClientProvider } from 'next-intl';
import { useRouter } from 'next/router';
export default function App({ Component, pageProps }: AppProps) {
  const route = useRouter()
  useEffect(() => {
    // Force dark mode
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <NextIntlClientProvider locale={route.locale} messages={pageProps.messages}>
      <Component {...pageProps} />
    </NextIntlClientProvider>
  );
}
