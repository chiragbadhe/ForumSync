import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Toast from '@/components/ui/Toast';


export default function App({ Component, pageProps }: AppProps) {
  return (
    <Toast>
      <Component {...pageProps} />
    </Toast>
  );
}
