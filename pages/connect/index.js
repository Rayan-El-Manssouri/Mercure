import Image from 'next/image';

export default function Connect() {
    return (
        <main className='flex items-center justify-center overflow-hidden'>
            <div className='mt-6 flex flex-col items-center justify-center flex-1'>
                {/* Logo */}
                <div className='mb-6 flex justify-center items-center text-center'>
                    
                    <Image
                        src="/assets/color light 500.png"
                        width={50}
                        height={50}
                        alt="Logo"
                    />
                    
                    <div className='ml-4'>
                        <h1 className='text-2lg'>Mercure - Connect</h1>
                    </div>

                </div>
                <form className='border rounded p-4 font-normal w-80'>
                    <div className='mt-4 w-full'>
                        <label htmlFor="email" className='mb-2 mt-2'>Email</label>
                        <div>
                            <input
                                id="email"
                                type="email"
                                placeholder=""
                                className='p-1 border rounded px-1 text-xs focus:border-purple-400 outline-none transition w-full'
                            />
                        </div>
                    </div>
                    <div className='mt-4 w-full text-lg'>
                        <label htmlFor="password" className='mb-2 mt-2'>Mot de passe</label>
                        <div>
                            <input
                                id="password"
                                type="password"
                                placeholder=""
                                className='p-1 border rounded px-1 text-xs focus:border-purple-400 outline-none transition w-full'
                            />
                        </div>
                    </div>

                    <div className='border w-full text-center mt-6 rounded p-1 hover:bg-gray-100 transition'>
                        <button type="button">Connexion</button>
                    </div>
                    <div className='w-full text-right'>
                        <p className='mt-4 mb-4 text-purple-400 text-sm hover:underline hover:underline-offset-2'>
                            Vous avez pas de compte ?
                        </p>
                    </div>
                </form>

                <ul className=" mt-2 flex w-full items-center justify-center ml-3">
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