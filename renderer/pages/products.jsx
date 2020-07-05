import React, { useEffect, useState } from "react";
import Head from "next/head";
import db from "../../database/db";
import { FiX, FiEdit2 } from "react-icons/fi";
import Modal from "../components/modal";
import NavBar from '../components/navbar';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState({
        id: 0,
        newId: 0,
        name: '',
        price: 0,
    });
    const [search, setSearch] = useState("");
    const [showAddProductModal, setShowAddProductModal] = useState(false);
    const [showUpdateProductModal, setShowUpdateProductModal] = useState(false);

    useEffect(() => {
        db.all(`SELECT * FROM products`, (err, res) => {
            if (err) alert("Houve um erro ao carregar os produtos.");
            const products = res.map(item => ({ ...item, newId: item.id }))
            setProducts(products);
        });
    }, []);

    function addProduct(e) {
        e.preventDefault();

        var { id, name, price } = product;

        db.run(
            `INSERT INTO products (
        	    id,
        	    name,
        	    price
    	    ) VALUES (
                ?, ?, ?
    		)`,
            [id, name, price],
            (err) => {
                if (err) alert("Houve um erro ao adicionar o produto");

                if (!err) {
                    var productsCopy = [...products];
                    productsCopy.push(product);

                    setProducts(productsCopy);
                }


                setShowAddProductModal(false);
                setProduct({
                    id: 0,
                    newId: 0,
                    name: '',
                    price: 0,
                });
            }
        );
    }

    function changeProduct(e) {
        const name = e.target.name; 
        const value = e.target.value;
        const productCopy = { ...product };

        productCopy[name] = value;

        setProduct(productCopy);
    }

    function updateProduct(e) {
        e.preventDefault();

        var { id, newId, name, price } = product;

        db.run(
            `UPDATE products SET id = '${newId}', name = '${name}', price = '${price}' WHERE id = '${id}'`,
            (err) => {
                if (err) alert("Houve um erro ao atualizar o produto");

                db.all(`SELECT * FROM products`, (err, res) => {
                    if (err) alert("Houve um erro ao carregar os produtos.");
                    if (!err) setProducts(res);
                });

                setShowUpdateProductModal(false);

                setProduct({
                    id: 0,
                    newId: 0,
                    name: '',
                    price: 0,
                });
            }
        );
    }

    function searchProduct(value) {
        setSearch(value);

        db.all(
            `SELECT * FROM products WHERE name LIKE '%${value}%'`,
            (err, res) => {
                if (err) alert("Houve um erro ao carregar as informações.");
                setProducts(res);
            }
        );
    }

    function removeProduct(id) {
        db.run(`DELETE FROM products WHERE id = ${id}`, (err) => {
            if (err) alert("Houve um erro ao deletar o produto");

            setProducts(products.filter((f) => f.id !== id));
        });
    }

    function setProductToChange(item) {
        const newId = item.id;

        setProduct({ ...item, newId });
    }

    return (
        <React.Fragment>
            <Head>
                <title>Produtos</title>
            </Head>
            <NavBar title='Produtos' />
            <div className='container'>
                <Modal show={showAddProductModal}>
                    <form onSubmit={addProduct}>
                        <h3>ID:</h3>
                        <input
                            name='id'
                            type='number'
                            value={product.id}
                            onChange={(e) => changeProduct(e)}
                        />
                        <h3>Nome:</h3>
                        <input
                            name='name'
                            type='text'
                            placeholder='Digite o nome do produto'
                            value={product.name}
                            onChange={(e) => changeProduct(e)}
                        />
                        <h3>Preço:</h3>
                        <input
                            name='price'
                            type='number'
                            value={product.price}
                            onChange={(e) => changeProduct(e)}
                        />
                        <button type='button' onClick={addProduct}>
                            Salvar
                        </button>
                        <button type='button' onClick={() => setShowAddProductModal(false)}>
                            Cancelar
                        </button>
                    </form>
                </Modal>
                <Modal show={showUpdateProductModal}>
                    <form onSubmit={addProduct}>
                        <h3>ID:</h3>
                        <input
                            name="newId"
                            type="number"
                            value={product.newId}
                            onChange={(e) => changeProduct(e)}
                        />
                        <h3>Nome:</h3>
                        <input
                            name="name"
                            type="text"
                            value={product.name}
                            onChange={(e) => changeProduct(e)}
                        />
                        <h3>Preço:</h3>
                        <input
                            name="price"
                            type="number"
                            value={product.price}
                            onChange={(e) => changeProduct(e)}
                        />
                        <button type="button" onClick={updateProduct}>
                            Salvar
                        </button>
                        <button
                            type="button"
                            onClick={() => setShowUpdateProductModal(false)}
                        >
                            Cancelar
                        </button>
                    </form>
                </Modal>
                <input
                    name='search'
                    type='text'
                    placeholder='Pesquisar produto'
                    value={search}
                    onChange={(e) => searchProduct(e.target.value)}
                />
                <button
                    type='button'
                    onClick={() => {
                        setProduct({
                            id: 0,
                            newId: 0,
                            name: '',
                            price: 0
                        });
                        setShowAddProductModal(true);
                    }}
                >
                    Adicionar produto
                </button>
                <ul className='ul-scrollable'>
                    {products.map((item) => (
                        <li key={item.id}>
                            <FiEdit2 onClick={() => {
                                setProductToChange(item);
                                setShowUpdateProductModal(true);
                            }} style={{marginRight: 15}} />
                            <div className='li-content'>
                                <h2>{item.id}</h2>
                                <h2>{item.name}</h2>
                                <h2>R${item.price}</h2>
                            </div>
                            <FiX onClick={() => removeProduct(item.id)} style={{marginLeft: 15}}/>
                        </li>
                    ))}
                </ul>
            </div>
        </React.Fragment>
    );
};

export default Products;
