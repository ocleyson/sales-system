import React, { useEffect, useState } from "react";
import Head from "next/head";
import db from "../../database/db";
import { FiX, FiEdit2 } from "react-icons/fi";
import Modal from "../components/modal";
import NavBar from '../components/navbar';

const Tables = () => {
    const [tables, setTables] = useState([]);
    const [table, setTable] = useState({
        id: 0,
        name: '',
    });
    const [search, setSearch] = useState("");
    const [showAddTableModal, setShowAddTableModal] = useState(false);
    const [showUpdateTableModal, setShowUpdateTableModal] = useState(false);

    useEffect(() => {
        db.all(`SELECT * FROM tables`, (err, res) => {
            if (err) alert("Houve um erro ao carregar os mesas.");
            setTables(res);
        });
    }, []);

    function addTable(e) {
        e.preventDefault();

        var { name } = table;

        db.run(
            `INSERT INTO tables (
        	    name
    	    ) VALUES (
                ?
    		)`,
            [name],
            (err) => {
                if (err) alert("Houve um erro ao adicionar o mesa");

                if (!err) {
                    var tablesCopy = [...tables];
                    tablesCopy.push(table);

                    setTables(tablesCopy);
                }


                setShowAddTableModal(false);
                setTable({
                    id: 0,
                    name: '',
                });
            }
        );
    }

    function changeTable(e) {
        const name = e.target.name; 
        const value = e.target.value;
        const tableCopy = { ...table };

        tableCopy[name] = value;

        setTable(tableCopy);
    }

    function updateTable(e) {
        e.preventDefault();

        var { id, name } = table;

        db.run(
            `UPDATE tables SET name = '${name}' WHERE id = '${id}'`,
            (err) => {
                if (err) alert("Houve um erro ao atualizar o mesa");

                db.all(`SELECT * FROM tables`, (err, res) => {
                    if (err) alert("Houve um erro ao carregar os mesas.");
                    if (!err) setTables(res);
                });

                setShowUpdateTableModal(false);

                setTable({
                    id: 0,
                    name: '',
                });
            }
        );
    }

    function searchTable(value) {
        setSearch(value);

        db.all(
            `SELECT * FROM tables WHERE name LIKE '%${value}%'`,
            (err, res) => {
                if (err) alert("Houve um erro ao carregar as informações.");
                setTables(res);
            }
        );
    }

    function removeTable(id) {
        db.run(`DELETE FROM tables WHERE id = ${id}`, (err) => {
            if (err) alert("Houve um erro ao deletar o mesa");

            setTables(tables.filter((f) => f.id !== id));
        });
    }

    function setTableToChange(item) {
        setTable(item);
    }

    return (
        <React.Fragment>
            <Head>
                <title>Mesas</title>
            </Head>
            <NavBar title='Mesas' />
            <div className='container'>
                <Modal show={showAddTableModal}>
                    <form onSubmit={addTable}>
                        <h3>Nome:</h3>
                        <input
                            name='name'
                            type='text'
                            placeholder='Digite o nome do mesa'
                            value={table.name}
                            onChange={(e) => changeTable(e)}
                        />
                        <button type='button' onClick={addTable}>
                            Salvar
                        </button>
                        <button type='button' onClick={() => setShowAddTableModal(false)}>
                            Cancelar
                        </button>
                    </form>
                </Modal>
                <Modal show={showUpdateTableModal}>
                    <form onSubmit={addTable}>
                        <h3>Nome:</h3>
                        <input
                            name="name"
                            type="text"
                            value={table.name}
                            onChange={(e) => changeTable(e)}
                        />
                        <button type="button" onClick={updateTable}>
                            Salvar
                        </button>
                        <button
                            type="button"
                            onClick={() => setShowUpdateTableModal(false)}
                        >
                            Cancelar
                        </button>
                    </form>
                </Modal>
                <input
                    name='search'
                    type='text'
                    placeholder='Pesquisar mesas'
                    value={search}
                    onChange={(e) => searchTable(e.target.value)}
                />
                <button
                    type='button'
                    onClick={() => {
                        setTable({
                            id: 0,
                            name: '',
                        });
                        setShowAddTableModal(true);
                    }}
                >
                    Adicionar mesa
                </button>
                <ul className='ul-scrollable'>
                    {tables.map((item) => (
                        <li key={item.id}>
                            <FiEdit2 onClick={() => {
                                setTableToChange(item);
                                setShowUpdateTableModal(true);
                            }} style={{marginRight: 15}} />
                            <div className='li-content' style={{ justifyContent: 'center' }}>
                                <h2>{item.name}</h2>
                            </div>
                            <FiX onClick={() => removeTable(item.id)} style={{marginLeft: 15}}/>
                        </li>
                    ))}
                </ul>
            </div>
        </React.Fragment>
    );
};

export default Tables;
