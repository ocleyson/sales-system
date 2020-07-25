import React, { useState } from 'react';
import Head from 'next/head';
import '../styles/index.css';
import NavBar from '../components/navbar';

const Home = () => {
    const [id, setId] = useState('');

    function getId(e) {
        e.preventDefault();

        console.log(id);
    }
    
    return (
        <React.Fragment>
            <Head>
                <title>Home</title>
            </Head>
            <NavBar title='Home' />
            <div className="container">
                <form onSubmit={getId}>
                    <input
                        name='id'
                        type='text'
                        placeholder='Digite o id do produto ou da mesa'
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                    />
                </form>
            </div>
        </React.Fragment>
    );
};

export default Home;
