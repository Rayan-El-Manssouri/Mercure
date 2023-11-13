import '../../styles/main.scss';
import Header from '../../components/Header';
import HeaderPrivate from '../../components/NavBarHome';
import logo from '../../assets/color light 500.png';
import { IconSearch, IconUserCircle } from '@tabler/icons-react';
import { useEffect } from 'react';

const Messagerie = () => {

    useEffect(() => {
        handleRefresh()
        window.addEventListener('resize', handleRefresh)
    })

    const handleRefresh = (() => {
        const ListUsersScroll = document.getElementById("scrollbar-ul-users-list")
        ListUsersScroll.style.height = window.innerHeight - 200 + 'px'
    })

    return (
        <div className='body_private'>
            <HeaderPrivate logo={logo} />
            <div className='Header-contenaire'>
                <Header active="none" />
                <div className='notification'>
                    <p>Des nouveaux messages sont disponible ...</p>
                </div>
                <div
                    className='contenaire-aceuil'
                >
                    <div className='contenaire-users'>
                        <div className='header-users'>
                            <div className='border-header-users'>
                                <IconSearch />
                                <input placeholder='Rechercher un utilisateur' />
                            </div>
                        </div>
                        <div className='contenaire-users-list-users'>
                            <div className='scrollbar' id='scrollbar-ul-users-list'>
                                <ul>
                                    <li>
                                        <div><IconUserCircle /> </div>
                                        <div>Utilisateur 1</div>
                                    </li>
                                    <li>
                                        <div><IconUserCircle /> </div>
                                        <div>Utilisateur 1</div>
                                    </li>
                                    <li>
                                        <div><IconUserCircle /> </div>
                                        <div>Utilisateur 1</div>
                                    </li>
                                    <li>
                                        <div><IconUserCircle /> </div>
                                        <div>Utilisateur 1</div>
                                    </li>
                                    <li>
                                        <div><IconUserCircle /> </div>
                                        <div>Utilisateur 1</div>
                                    </li>
                                    <li>
                                        <div><IconUserCircle /> </div>
                                        <div>Utilisateur 1</div>
                                    </li>
                                    <li>
                                        <div><IconUserCircle /> </div>
                                        <div>Utilisateur 1</div>
                                    </li>
                                    <li>
                                        <div><IconUserCircle /> </div>
                                        <div>Utilisateur 1</div>
                                    </li>
                                    <li>
                                        <div><IconUserCircle /> </div>
                                        <div>Utilisateur 1</div>
                                    </li>
                                    <li>
                                        <div><IconUserCircle /> </div>
                                        <div>Utilisateur 1</div>
                                    </li>
                                    <li>
                                        <div><IconUserCircle /> </div>
                                        <div>Utilisateur 1</div>
                                    </li>
                                    <li>
                                        <div><IconUserCircle /> </div>
                                        <div>Utilisateur 1</div>
                                    </li>
                                    <li>
                                        <div><IconUserCircle /> </div>
                                        <div>Utilisateur 1</div>
                                    </li>
                                    <li>
                                        <div><IconUserCircle /> </div>
                                        <div>Utilisateur 1</div>
                                    </li>
                                    <li>
                                        <div><IconUserCircle /> </div>
                                        <div>Utilisateur 1</div>
                                    </li>
                                    <li>
                                        <div><IconUserCircle /> </div>
                                        <div>Utilisateur 1</div>
                                    </li>
                                    <li>
                                        <div><IconUserCircle /> </div>
                                        <div>Utilisateur 1</div>
                                    </li>
                                    <li>
                                        <div><IconUserCircle /> </div>
                                        <div>Utilisateur 1</div>
                                    </li>
                                    <li>
                                        <div><IconUserCircle /> </div>
                                        <div>Utilisateur 1</div>
                                    </li>
                                    <li>
                                        <div><IconUserCircle /> </div>
                                        <div>Utilisateur 1</div>
                                    </li>
                                    <li>
                                        <div><IconUserCircle /> </div>
                                        <div>Utilisateur 1</div>
                                    </li>
                                    <li>
                                        <div><IconUserCircle /> </div>
                                        <div>Utilisateur 1</div>
                                    </li>
                                    <li>
                                        <div><IconUserCircle /> </div>
                                        <div>Utilisateur 1</div>
                                    </li>
                                    <li>
                                        <div><IconUserCircle /> </div>
                                        <div>Utilisateur 1</div>
                                    </li>
                                    <li>
                                        <div><IconUserCircle /> </div>
                                        <div>Utilisateur 1</div>
                                    </li>
                                    <li>
                                        <div><IconUserCircle /> </div>
                                        <div>Utilisateur 1</div>
                                    </li>
                                    <li>
                                        <div><IconUserCircle /> </div>
                                        <div>Utilisateur 1</div>
                                    </li>
                                    <li>
                                        <div><IconUserCircle /> </div>
                                        <div>Utilisateur 1</div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className='contenaire-sender-recevier'>
                        <div className='sender'>
                            <p><IconUserCircle /></p>
                            <p>Pseudo</p>
                            <p>Saluut !</p>
                            <p>10h12</p>
                        </div>

                        <div className='recevier'>
                            <p><IconUserCircle /></p>
                            <p>Pseudo</p>
                            <p>Saluut !</p>
                            <p>10h12</p>
                        </div>

                        <div className='tools'>
                            <input />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Messagerie;