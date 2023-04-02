import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Toast from '@/components/ui/Toast';
import "typeface-nunito";
import "typeface-inter";




export default function App({ Component, pageProps }: AppProps) {
  return (
    <Toast>
      <Component {...pageProps} />
    </Toast>
  );
}
