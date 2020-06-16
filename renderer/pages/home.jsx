import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import '../styles/index.css';

const Home = () => {
    
  return (
    <React.Fragment>
      <Head>
        <title>Home</title>
      </Head>
      <div>
        <p>
          ⚡ Electron + Next.js ⚡ -
          <Link href="/products">
            <a>Go to Products</a>
          </Link>
        </p>
      </div>
    </React.Fragment>
  );
};

export default Home;
