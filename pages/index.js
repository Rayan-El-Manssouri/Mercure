import Image from 'next/image';
import { useState } from 'react';
import { IoCheckmark } from "react-icons/io5";

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
      <header className='p-3 border flex items-center justify-between text-sl w-full shadow-sm'>
        <div className='flex items-center space-x-4 w-full'>
          {/* Logo */}
          <Image
            src="/assets/color light 500.png"
            width={50}
            height={50}
            alt="Logo"
          />

          {/* Navigation */}
          <ul className="flex space-x-2 ">
            <li className="text-gray-500 hover:bg-gray-200 px-2 py-1 rounded  cursor-pointer transition-all">Accueil</li>
            <li className="text-gray-500 hover:bg-gray-200 px-2 py-1 rounded  cursor-pointer transition-all">Message</li>
            <li className="text-gray-500 hover:bg-gray-200 px-2 py-1 rounded  cursor-pointer transition-all">API</li>
            <li className="text-gray-500 hover:bg-gray-200 px-2 py-1 rounded  cursor-pointer transition-all">Support</li>
            <li className="text-gray-500 hover:bg-gray-200 px-2 py-1 rounded  cursor-pointer transition-all">Nouveauté</li>
            <li className="text-gray-500 hover:bg-gray-200 px-2 py-1 rounded  cursor-pointer transition-all">Hébergeur</li>
          </ul>

          <div className='w-full mr-auto text-right'>
            <button
              className="group relative justify-center py-2 px-4 text-gray-500 text-sm font-medium rounded-md border border-gray-300 hover:bg-[#F6F8FA] transition"
              onClick={openModal}
            >
              Connexion
            </button>
          </div>

        </div>
      </header>

      {/* Modal */}
      <div className={`fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-40 ${modalOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="bg-white p-4 rounded-md w-[30%]">
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
      <div className='w-full justify-center items-center flex flex-col'>
        <div className='flex flex-1 p-4 flex-row items-center w-full justify-center'>
          <div className='max-w-md mx-auto bg-white rounded border'>

            <div className='px-4 py-2 border border-t-0 border-l-0 border-r-0 flex w-full'>
              <h1 className=''>Forfait Gratuit</h1>
              <h1 className='ml-auto'>0€</h1>
            </div>

            <ul className='px-4 py-2'>
              <li className='flex items-center'> <IoCheckmark></IoCheckmark> <p className='ml-1'>Partager</p></li>
              <li className='flex items-center'> <IoCheckmark></IoCheckmark> <p className='ml-1'>Discuter avec vos amis</p></li>
              <li className='flex items-center'> <IoCheckmark></IoCheckmark> <p className='ml-1'>Envoyer des images de différentes tailles</p></li>
              <li className='flex items-center'> <IoCheckmark></IoCheckmark> <p className='ml-1'>Envoyer des images de différentes tailles</p></li>
              <li className='flex items-center'> <IoCheckmark></IoCheckmark> <p className='ml-1'>Envoyer des images de différentes tailles</p></li>
              <li className='flex items-center'> <IoCheckmark></IoCheckmark> <p className='ml-1'>Envoyer des images de différentes tailles</p></li>
              <li className='flex items-center'> <IoCheckmark></IoCheckmark> <p className='ml-1'>Envoyer des images de différentes tailles</p></li>
              <li className='flex items-center'> <IoCheckmark></IoCheckmark> <p className='ml-1'>Envoyer des images de différentes tailles</p></li>
              <li className='flex items-center'> <IoCheckmark></IoCheckmark> <p className='ml-1'>Envoyer des images de différentes tailles</p></li>
              <li className='flex items-center'> <IoCheckmark></IoCheckmark> <p className='ml-1'>Envoyer des images de différentes tailles</p></li>
            </ul>

            <div className='px-4 py-2'>
              <button className='bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600'>Payer</button>
            </div>
          </div>

          <div className='max-w-md mx-auto bg-white rounded- border'>

            <div className='px-4 py-2 border border-t-0 border-l-0 border-r-0 flex w-full'>
              <h1 className=''>Forfait Gratuit</h1>
              <h1 className='ml-auto'>0€</h1>
            </div>

            <ul className='px-4 py-2'>
              <li className='flex items-center'> <IoCheckmark></IoCheckmark> <p className='ml-1'>Partager</p></li>
              <li className='flex items-center'> <IoCheckmark></IoCheckmark> <p className='ml-1'>Discuter avec vos amis</p></li>
              <li className='flex items-center'> <IoCheckmark></IoCheckmark> <p className='ml-1'>Envoyer des images de différentes tailles</p></li>
              <li className='flex items-center'> <IoCheckmark></IoCheckmark> <p className='ml-1'>Envoyer des images de différentes tailles</p></li>
              <li className='flex items-center'> <IoCheckmark></IoCheckmark> <p className='ml-1'>Envoyer des images de différentes tailles</p></li>
              <li className='flex items-center'> <IoCheckmark></IoCheckmark> <p className='ml-1'>Envoyer des images de différentes tailles</p></li>
              <li className='flex items-center'> <IoCheckmark></IoCheckmark> <p className='ml-1'>Envoyer des images de différentes tailles</p></li>
              <li className='flex items-center'> <IoCheckmark></IoCheckmark> <p className='ml-1'>Envoyer des images de différentes tailles</p></li>
              <li className='flex items-center'> <IoCheckmark></IoCheckmark> <p className='ml-1'>Envoyer des images de différentes tailles</p></li>
              <li className='flex items-center'> <IoCheckmark></IoCheckmark> <p className='ml-1'>Envoyer des images de différentes tailles</p></li>
            </ul>

            <div className='px-4 py-2'>
              <button className='bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600'>Payer</button>
            </div>

          </div>

          <div className='max-w-md mx-auto bg-white rounded- border'>

            <div className='px-4 py-2 border border-t-0 border-l-0 border-r-0 flex w-full'>
              <h1 className=''>Forfait Gratuit</h1>
              <h1 className='ml-auto'>0€</h1>
            </div>

            <ul className='px-4 py-2'>
              <li className='flex items-center'> <IoCheckmark></IoCheckmark> <p className='ml-1'>Partager</p></li>
              <li className='flex items-center'> <IoCheckmark></IoCheckmark> <p className='ml-1'>Discuter avec vos amis</p></li>
              <li className='flex items-center'> <IoCheckmark></IoCheckmark> <p className='ml-1'>Envoyer des images de différentes tailles</p></li>
              <li className='flex items-center'> <IoCheckmark></IoCheckmark> <p className='ml-1'>Envoyer des images de différentes tailles</p></li>
              <li className='flex items-center'> <IoCheckmark></IoCheckmark> <p className='ml-1'>Envoyer des images de différentes tailles</p></li>
              <li className='flex items-center'> <IoCheckmark></IoCheckmark> <p className='ml-1'>Envoyer des images de différentes tailles</p></li>
              <li className='flex items-center'> <IoCheckmark></IoCheckmark> <p className='ml-1'>Envoyer des images de différentes tailles</p></li>
              <li className='flex items-center'> <IoCheckmark></IoCheckmark> <p className='ml-1'>Envoyer des images de différentes tailles</p></li>
              <li className='flex items-center'> <IoCheckmark></IoCheckmark> <p className='ml-1'>Envoyer des images de différentes tailles</p></li>
              <li className='flex items-center'> <IoCheckmark></IoCheckmark> <p className='ml-1'>Envoyer des images de différentes tailles</p></li>
            </ul>

            <div className='px-4 py-2'>
              <button className='bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600'>Payer</button>
            </div>

          </div>


        </div>

      </div>
    </main>
  );
}