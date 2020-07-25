import React, { useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import Link from 'next/link';

const NavBar = ({ title }) => {
    const [showMenu, setShowMenu] = useState(false);

    return (
        <React.Fragment>
            <div className='nav-container'>
                <FiMenu size={30} onClick={() => setShowMenu(!showMenu)} />
                <h1 className='title'>{title}</h1>
                <div className='modal-menu' style={{display: showMenu ? 'flex' : 'none'}}>
                    <ul>
                        <li>
                            <Link href='/home'>
                                <a>Home</a>
                            </Link>
                        </li>
                        <li>
                            <Link href='/products'>
                                <a>Produtos</a>
                            </Link>
                        </li>
                        <li>
                            <Link href='/tables'>
                                <a>Mesas</a>
                            </Link>
                        </li>
                        <li>
                            <Link href='/help'>
                                <a>Ajuda</a>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </React.Fragment>
    );
};

export default NavBar;