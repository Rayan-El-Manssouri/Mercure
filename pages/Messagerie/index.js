import SideBar from "../components/SideBar";
import SectionJS from "./components/SectionJS";

export default function Messagerie() {


    return (
        <div className="flex flex-1 h-full">
            <SideBar activeItem={1} />

            <div className="flex border p-1 flex-col">

                <SectionJS />
                <SectionJS />
                <SectionJS />
                <SectionJS />
                <SectionJS />
                <SectionJS />
                <SectionJS />
            </div>
        </div>
    );
}
