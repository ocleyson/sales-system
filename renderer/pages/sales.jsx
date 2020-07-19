import React from 'react';
import Head from 'next/head';
import NavBar from '../components/navbar';

const Sales = () => {
    
    return (
        <React.Fragment>
            <Head>
                <title>Vendas</title>
            </Head>
            <div>
                <NavBar title='Vendas' />
                
                <h2>Total de produtos vendidos: R$ 0</h2>

                <h2>Total de produtos cancelados: R$ 0</h2>
            </div>
        </React.Fragment>
    );
};

export default Sales;
