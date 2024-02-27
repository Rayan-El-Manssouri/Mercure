import { useState } from 'react';
import Header from './components/Header';
import Image from 'next/image';

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <main>
      {/* Header */}
      <Header openModal={openModal} />

      {/* Modal */}
      <div className={`fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-40 ${modalOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="bg-white p-4 rounded-md w-[70%]">
          <div>
            <div className='flex items-center w-full'>
              {/* Logo */}
              <Image
                src="/assets/color light 500.png"
                width={50}
                height={50}
                alt="Logo"
              />
              <p className='ml-2 text-lg'>
                Mercure Connect
              </p>
              <button onClick={closeModal} className=' ml-auto float-right text-gray-500 hover:text-gray-700 cursor-pointer focus:outline-none'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                  <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
          </div>

          <form className="mt-8 space-y-6" method="post">
            <div className="rounded-md">
              <div className='mb-2'>
                <p className="font-normal text-left ml-1 mb-1 text-gray-500">
                  Email
                </p>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className=" transition appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-500  focus:outline-none focus:border-purple-500 focus:z-10 sm:text-sm"
                  placeholder="Email"
                />
              </div>
              <div className=''>
                <p className="font-normal text-left ml-1 mb-1 text-gray-500">
                  Mot de passe
                </p>

                <div className='flex items-center transition appearance-none rounded relative w-full h-full border bg-white  border-gray-300 placeholder-gray-500 text-gray-500 focus:outline-none  focus-within:border-purple-500 sm:text-sm'>

                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="w-full outline-none bg-transparent h-full px-3 py-2 focus:z-10"
                    placeholder="Mot de passe"
                  />
                </div>

              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700"
              >
                Connexion
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className='flex w-full items-center text-center flex-col'>
        <p className='m-5 text-gray-500'>Communiquer d'une façon plus sécurisée.</p>

        <div className='border w-[700px] h-[500px] rounded bg-white flex-col'>

          <div className='border w-[15%] h-full border-l-0 border-t-0 border-b-0'>

          </div>
        </div>

      </div>

    </main>
  );
}