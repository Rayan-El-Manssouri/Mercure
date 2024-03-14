import Header from './components/Header';
import Image from 'next/image';

export default function Home() {
  return (
    <main>
      {/* Header */}
      <Header />

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