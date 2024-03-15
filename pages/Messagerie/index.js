import SideBar from "../components/SideBar";
import SectionJS from "./components/SectionJS";
import { IoIosSearch } from "react-icons/io";

export default function Messagerie() {
    return (
        <div className="flex flex-1 h-full">
            <SideBar activeItem={1} />

            <div className="flex flex-col ">

                <div className="flex flex-1 w-full">
                    <div className="flex w-full">
                        <div className="flex p-1 flex-row items-center border focus-within:border-purple-400 w-full">
                            <IoIosSearch className="mr-1" />
                            <input className="w-full outline-none caret-purple-500 text-sm" />
                        </div>

                        <div className="border rounded m-1 cursor-pointer bg-gray-200 hover:bg-gray-300">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-gray-600">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                        </div>

                    </div>
                </div>


                <div className="flex border p-1 flex-col w-96 bg-gray-50 overflow-y-auto">
                    <SectionJS />
                    <SectionJS />
                    <SectionJS />
                    <SectionJS />
                    <SectionJS />
                    <SectionJS />
                    <SectionJS />
                    <SectionJS />
                    <SectionJS />
                    <SectionJS />
                    <SectionJS />
                    <SectionJS />
                    <SectionJS />
                    <SectionJS />
                    <SectionJS />
                    <SectionJS />
                </div>

            </div>
            <div className="flex flex-1 justify-center items-center flex-col">
                <div className="flex flex-col items-center">
                    {/* Logo */}
                    <div className="mb-2">
                        {/* Remplacez l'image par votre propre logo */}
                        <img src="/assets/color light 500.png" alt="Logo" width={50} height={50} />
                    </div>
                    <p className="mb-2">Pour accéder aux messages d'un utilisateur, il vous suffit de cliquer sur la conversation.</p>
                </div>
                <div>
                    <button className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline">
                        Envoyer un message
                    </button>
                </div>
            </div>
        </div>
    );
}