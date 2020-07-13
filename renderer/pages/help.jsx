import React from 'react';
import Head from 'next/head';
import NavBar from '../components/navbar';

const Help = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Ajuda</title>
      </Head>

      <NavBar title='Ajuda' />
      
      <div className="container">

        <h2>CTRL + P: Página de Produtos</h2>

        <h2>CTRL + V: Página de Venda</h2>

        <h2>CTRL + M: Página de Mesas</h2>

        <h2>CTRL + D: Página de Dinheiro</h2>

        <h2>CTRL + A: Página de Ajuda</h2>

        <h2>CTRL + B: Volta para o campo de busca nas páginas de Produtos e Mesas.</h2>

        <h2>CTRL + ALT + L: Limpar todas as movimentações</h2>

        <h2>DELETE: Limpar mesa</h2>

        <h2>ESC: Desmarcar a mesa selecionada</h2>
      </div>
    </React.Fragment>
  );
};

export default Help;
