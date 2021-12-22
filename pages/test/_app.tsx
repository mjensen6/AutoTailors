import type { AppProps } from 'next/app';
import 'bootstrap/dist/css/bootstrap.min.css';
import TestLayout from '../../components/TestLayout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <TestLayout />
      <div className="container mx-auto py-10">
        <Component {...pageProps} />
      </div>
    </>
  );
}
export default MyApp;
