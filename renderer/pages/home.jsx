import React, { useState } from 'react';
import Head from 'next/head';
import '../styles/index.css';
import NavBar from '../components/navbar';
import { FiX } from "react-icons/fi";

const Home = () => {
    const [id, setId] = useState('');
    const [products, setProducts] = useState([]);
    const [table, setTable] = useState('');
    const [totalPrice, setTotalPrice] = useState('');
    const [customerMoney, setCustomerMoney] = useState('');
    const [customerChange, setCustomerChange] = useState('');

    function getId(e) {
        e.preventDefault();

        console.log(id);
    }

    function removeProduct(id) {
        console.log('product id: ', id);
    }
    
    return (
        <React.Fragment>
            <Head>
                <title>Home</title>
            </Head>
            <NavBar title='Home' />
            <div className="container">

                <div className='home-sale-info-container'>

                    <ul className='ul-scrollable'>
                        {products.map((item) => (
                            <li key={item.id}>
                                <div className='li-content'>
                                    <h2>{item.id}</h2>
                                    <h2>{item.name}</h2>
                                    <h2>R${item.price}</h2>
                                </div>
                                <FiX onClick={() => removeProduct(item.id)} style={{marginLeft: 15}}/>
                            </li>
                        ))}
                    </ul>

                    <div className='home-sale-info'>

                        <div className='sale-info'>
                            <h2>Mesa: {table}</h2>
                        </div>

                        <div className='sale-info'>
                            <h2>Total: {totalPrice}</h2>
                        </div>

                        <div className='sale-info'>
                            <h2>Valor: {customerMoney}</h2>
                        </div>

                        <div className='sale-info'>
                            <h2>Troco: {customerChange}</h2>
                        </div>

                    </div>

                </div>

                <form className='home-sale' onSubmit={getId}>
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
