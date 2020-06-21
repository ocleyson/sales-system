import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import '../styles/index.css';
import NavBar from '../components/navbar';

const Home = () => {
    
  return (
    <React.Fragment>
      <Head>
        <title>Home</title>
      </Head>
      <div>
          <NavBar title='Home' />
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
