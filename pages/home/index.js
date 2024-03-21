import SideBar from "../components/SideBar/SideBar";

export default function Home() {
    return (
        <div className='flex flex-1 h-full'>
            <SideBar activeItem={0} />
        </div>
    );
}