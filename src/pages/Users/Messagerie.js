import '../../styles/main.scss';
import Header from '../../components/Header';
import HeaderPrivate from '../../components/NavBarHome';
import logo from '../../assets/color light 500.png';
import { IconDownload, IconMicrophone, IconMoodHappy, IconSearch, IconUserCircle, IconUsersPlus } from '@tabler/icons-react';
import { useEffect } from 'react';
import UsersList from './ListUsersComponents/UsersList';

const Messagerie = () => {

    useEffect(() => {
        handleRefresh()
        window.addEventListener('resize', handleRefresh)
    })

    const handleRefresh = (() => {
        const ListUsersScroll = document.getElementById("scrollbar-ul-users-list")
        const SenderReceiverList = document.getElementById("contenaire-sender-recevier-list")
        ListUsersScroll.style.height = window.innerHeight - 140 + 'px'
        SenderReceiverList.style.height = window.innerHeight - 87 + 'px'
        SenderReceiverList.style.overflowY = 'srcoll'
    })

    return (
        <div className='body_private'>
            <HeaderPrivate logo={logo} />
            <div className='Header-contenaire'>
                <Header active="none" />
                <div
                    className='contenaire-aceuil'
                >
                    <div className='contenaire-users'>
                        <div className='header-users'>
                            <div className='border-header-users'>
                                <IconSearch />
                                <input placeholder='Rechercher un utilisateur' />
                            </div>
                            <IconUsersPlus className='users-add-plus' />
                        </div>
                        <div className='contenaire-users-list-users' id='ConteneurUsersListUsersId'>
                            <div className='scrollbar' id='scrollbar-ul-users-list'>
                                <ul>
                                    <UsersList pseudo="Pseudo" message="Salut j'ai une question pour le stage du 09" />
                                    <UsersList pseudo="Pseudo" message="Salut j'ai une question pour le stage du 09" />
                                    <UsersList pseudo="Pseudo" message="Salut j'ai une question pour le stage du 09" />
                                    <UsersList pseudo="Pseudo" message="Salut j'ai une question pour le stage du 09" />
                                    <UsersList pseudo="Pseudo" message="Salut j'ai une question pour le stage du 09" />
                                    <UsersList pseudo="Pseudo" message="Salut j'ai une question pour le stage du 09" />
                                    <UsersList pseudo="Pseudo" message="Salut j'ai une question pour le stage du 09" />
                                    <UsersList pseudo="Pseudo" message="Salut j'ai une question pour le stage du 09" />
                                    <UsersList pseudo="Pseudo" message="Salut j'ai une question pour le stage du 09" />
                                    <UsersList pseudo="Pseudo" message="Salut j'ai une question pour le stage du 09" />
                                    <UsersList pseudo="Pseudo" message="Salut j'ai une question pour le stage du 09" />
                                    <UsersList pseudo="Pseudo" message="Salut j'ai une question pour le stage du 09" />
                                    <UsersList pseudo="Pseudo" message="Salut j'ai une question pour le stage du 09" />
                                    <UsersList pseudo="Pseudo" message="Salut j'ai une question pour le stage du 09" />
                                    <UsersList pseudo="Pseudo" message="Salut j'ai une question pour le stage du 09" />
                                    <UsersList pseudo="Pseudo" message="Salut j'ai une question pour le stage du 09" />
                                    <UsersList pseudo="Pseudo" message="Salut j'ai une question pour le stage du 09" />
                                    <UsersList pseudo="Pseudo" message="Salut j'ai une question pour le stage du 09" />
                                    <UsersList pseudo="Pseudo" message="Salut j'ai une question pour le stage du 09" />
                                    <UsersList pseudo="Pseudo" message="Salut j'ai une question pour le stage du 09" />
                                    <UsersList pseudo="Pseudo" message="Salut j'ai une question pour le stage du 09" />
                                    <UsersList pseudo="Pseudo" message="Salut j'ai une question pour le stage du 09" />
                                    <UsersList pseudo="Pseudo" message="Salut j'ai une question pour le stage du 09" />
                                    <UsersList pseudo="Pseudo" message="Salut j'ai une question pour le stage du 09" />
                                    <UsersList pseudo="Pseudo" message="Salut j'ai une question pour le stage du 09" />
                                    <UsersList pseudo="Pseudo" message="Salut j'ai une question pour le stage du 09" />
                                    <UsersList pseudo="Pseudo" message="Salut j'ai une question pour le stage du 09" />
                                    <UsersList pseudo="Pseudo" message="Salut j'ai une question pour le stage du 09" />
                                    <UsersList pseudo="Pseudo" message="Salut j'ai une question pour le stage du 09" />
                                    <UsersList pseudo="Pseudo" message="Salut j'ai une question pour le stage du 09" />
                                    <UsersList pseudo="Pseudo" message="Salut j'ai une question pour le stage du 09" />
                                    <UsersList pseudo="Pseudo" message="Salut j'ai une question pour le stage du 09" />
                                    <UsersList pseudo="Pseudo" message="Salut j'ai une question pour le stage du 09" />
                                    <UsersList pseudo="Pseudo" message="Salut j'ai une question pour le stage du 09" />
                                    <UsersList pseudo="Pseudo" message="Salut j'ai une question pour le stage du 09" />
                                    <UsersList pseudo="Pseudo" message="Salut j'ai une question pour le stage du 09" />
                                    <UsersList pseudo="Pseudo" message="Salut j'ai une question pour le stage du 09" />
                                    <UsersList pseudo="Pseudo" message="Salut j'ai une question pour le stage du 09" />
                                    <UsersList pseudo="Pseudo" message="Salut j'ai une question pour le stage du 09" />
                                    <UsersList pseudo="Pseudo" message="Salut j'ai une question pour le stage du 09" />
                                    <UsersList pseudo="Pseudo" message="Salut j'ai une question pour le stage du 09" />
                                    <UsersList pseudo="Pseudo" message="Salut j'ai une question pour le stage du 09" />
                                    <UsersList pseudo="Pseudo" message="Salut j'ai une question pour le stage du 09" />
                                    <UsersList pseudo="Pseudo" message="Salut j'ai une question pour le stage du 09" />
                                    <UsersList pseudo="Pseudo" message="Salut j'ai une question pour le stage du 09" />
                                    <UsersList pseudo="Pseudo" message="Salut j'ai une question pour le stage du 09" />
                                    <UsersList pseudo="Pseudo" message="Salut j'ai une question pour le stage du 09" />
                                    <UsersList pseudo="Pseudo" message="Salut j'ai une question pour le stage du 09" />
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className='contenaire-sender-recevier'>
                        <div className='contenaire-sender-recevier-list' id='contenaire-sender-recevier-list'>
                            <div className='sender'>
                                <div><IconUserCircle /></div>
                                <p>Coucou !!</p>
                            </div>
                            <div className='recevier'>
                                <p>Salut !!</p>
                                <div><IconUserCircle /></div>
                            </div>

                        </div>

                        <div className='tools'>
                            <div className='tools-icons'>
                                <IconDownload />
                                <IconMoodHappy />
                                <IconMicrophone />
                            </div>
                            <input placeholder='Vôtre message ...' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Messagerie;