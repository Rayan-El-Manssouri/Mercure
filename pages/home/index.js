// Home.js

import { useState } from 'react';
import { IconAt, IconCode, IconFolder, IconLock, IconLockOpen, IconMicrophone } from "@tabler/icons-react";
import SideBar from "../components/SideBar/SideBar";
import Post from "./components/Post";
import CommentSection from "./components/CommentSection"; // Import du composant de section de commentaires

export default function Home() {
    const comptePrive = true;

    // Exemple de données de commentaires pour les publications (à remplacer par vos propres données)
    const commentsForPosts = [
        ["Commentaire 1", "Commentaire 2"],
        ["Commentaire 3", "Commentaire 4"]
    ];

    // Utilisez l'état local pour gérer l'affichage des commentaires
    const [showComments, setShowComments] = useState(Array(commentsForPosts.length).fill(false));

    return (
        <div className='flex flex-1 h-full'>
            <SideBar activeItem={0} />
            <div className="flex flex-1 w-full overflow-auto">
                <div className="p-4 w-full">

                    <div className="flex mb-8 flex-row flex-1 w-full">
                        <div className="bg-white p-4 border rounded flex flex-col flex-1 mr-5">
                            <div className="flex items-center mb-4">
                                <img className="w-10 h-10 rounded-full mr-2" src="https://via.placeholder.com/50" alt="User profile" />
                                <div>
                                    <p className="font-semibold">Nom de l'utilisateur</p>
                                    <p className="text-gray-500 text-sm">Information supplémentaire</p>
                                </div>
                                <div className="ml-auto mb-auto text-sm flex items-center">
                                    <p className={comptePrive ? "text-red-500" : "text-purple-500"}>
                                        {comptePrive ? "Compte privé" : "Compte public"}
                                    </p>
                                    <span className="text-red-500">
                                        {comptePrive ? (
                                            <IconLock />
                                        ) : <IconLockOpen className="text-purple-500" />}
                                    </span>
                                </div>
                            </div>
                            <div className="flex justify-between">
                                <div>
                                    <p className="font-semibold">Followers</p>
                                    <p className="text-gray-500">500k</p>
                                </div>
                                <div>
                                    <p className="font-semibold">Following</p>
                                    <p className="text-gray-500">12</p>
                                </div>
                                <div>
                                    <p className="font-semibold">Posts</p>
                                    <p className="text-gray-500">5k</p>
                                </div>
                            </div>
                        </div>


                        <div className="border rounded p-2 flex flex-col flex-1">

                            <div className="flex items-center">
                                <input
                                    className="outline-none border flex-grow p-2 mr-2 text-gray-800 focus:border-purple-500 rounded-lg w-full"
                                    type="text"
                                    placeholder="Votre message..."
                                    aria-label="Votre message"
                                    autoComplete="off"
                                    autoFocus
                                />
                                <button
                                    className="bg-purple-500 text-white font-semibold py-2 px-4 rounded hover:bg-purple-600 cursor-pointer transition duration-300"
                                    aria-label="Envoyer"
                                >
                                    Envoyer
                                </button>
                            </div>

                            <div className="flex ml-2 items-center mt-2">
                                <button className="p-2 rounded-full hover:bg-gray-200 focus:outline-none focus:bg-gray-200">
                                    <IconFolder className="w-6 h-6 text-gray-600" />
                                </button>
                                <button className="p-2 rounded-full hover:bg-gray-200 focus:outline-none focus:bg-gray-200">
                                    <IconMicrophone className="w-6 h-6 text-gray-600" />
                                </button>
                                <button className="p-2 rounded-full hover:bg-gray-200 focus:outline-none focus:bg-gray-200">
                                    <IconCode className="w-6 h-6 text-gray-600" />
                                </button>
                                <button className="p-2 rounded-full hover:bg-gray-200 focus:outline-none focus:bg-gray-200">
                                    <IconAt className="w-6 h-6 text-gray-600" />
                                </button>
                            </div>
                            <div className="ml-2 mt-2 text-gray-600">
                                Vous souhaitez suggérer ?
                            </div>
                        </div>
                    </div>

                    {/* Utilisation du composant de publication avec des données statiques */}
                    <div className='flex flex-col'>
                        {commentsForPosts.map((comments, index) => (
                            <div key={index} className='flex flex-col'>
                                <Post
                                    userProfileImage="https://via.placeholder.com/50"
                                    username="Nom de l'utilisateur"
                                    postDate="@nomutilisateur"
                                    content="Contenu de la publication..."
                                    likesCount={42}
                                    commentsCount={7}
                                    sharesCount={12}
                                    isOriginal={index % 2 === 0} // Exemple d'utilisation de la propriété isOriginal
                                />

                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}