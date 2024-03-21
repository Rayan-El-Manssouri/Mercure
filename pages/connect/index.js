import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'; // Importation du router de Next.js
import axios from 'axios';

export default function Connect() {
    const router = useRouter(); // Initialisation du router
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/auth/login', { email, password });
            const token = response.data.token;
            localStorage.setItem('token', token);
            router.push('/Home'); // Utilisation du router pour rediriger vers la route /home après une connexion réussie
        } catch (error) {
            setError('Email ou mot de passe incorrect');
        }
    };

    return (
        <main className='flex items-center justify-center overflow-hidden'>
            <div className='mt-6 flex flex-col items-center justify-center flex-1'>
                <div className='mb-6 flex justify-center items-center text-center'>
                    {/* Logo */}
                    <div>
                        {/* Remplacez l'image par votre propre logo */}
                        <img src="/assets/color light 500.png" alt="Logo" width={50} height={50} />
                    </div>
                    <div className='ml-4'>
                        <h1 className='text-2lg'>Mercure - Connect</h1>
                    </div>
                </div>
                <form onSubmit={handleSubmit} className='border rounded p-4 font-normal w-96'>

                    <div className='mt-4 w-full'>
                        <label htmlFor="email" className='mb-2 mt-2'>Email</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder=""
                            className='p-1 border rounded px-1 text-xs focus:border-purple-400 outline-none transition w-full'
                            required
                        />
                    </div>
                    <div className='mt-4 w-full text-lg'>
                        <label htmlFor="password" className='mb-2 mt-2'>Mot de passe</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder=""
                            className='p-1 border rounded px-1 text-xs focus:border-purple-400 outline-none transition w-full'
                            required
                        />
                    </div>

                    <div className='border w-full text-center mt-6 rounded p-1 hover:bg-gray-100 transition'>
                        <button type="submit">Connexion</button>
                    </div>
                    <div className='w-full text-center mb-2 mt-2'>
                        {error && <p className='text-red-500 mb-2'>{error}</p>}
                    </div>
                    <div className='w-full text-center flex mt-4 mb-4'>
                        <p className='text-purple-400 text-sm hover:underline hover:underline-offset-2'>
                            Vous n'avez pas de compte ?
                        </p>
                        <p className='text-purple-400 text-sm hover:underline hover:underline-offset-2 mr-2 ml-2'>
                            |
                        </p>
                        <p className='text-purple-400 text-sm hover:underline hover:underline-offset-2'>
                            Mot de passe oublié ?
                        </p>
                    </div>
                </form>

                <ul className=" mt-2 flex w-full items-center justify-center ml-3 text-1sm">
                    <li className="mr-4">Docs</li>
                    <li className="mr-4">Support</li>
                    <li className="mr-4">Prix</li>
                    <li className="mr-4">Vidéo</li>
                    <li className="mr-4">Compte</li>
                </ul>
            </div>
        </main>
    );
}