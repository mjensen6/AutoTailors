import Head from 'next/head';
import TestLayout from '../../components/TestLayout'


interface HomeProps {

  }

export default function Home(props: HomeProps) {
    return (
      <div>
        <Head>
          <title>Threadz</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <TestLayout />
      </div>
    );
  }