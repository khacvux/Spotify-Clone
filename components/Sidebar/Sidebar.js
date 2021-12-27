
import Navbar from "./Navbar";
import Playlist from "./Playlist";

function Sidebar() {

    return (
        <div className="    py-4 px-6 
                            text-xs 
                            text-[#B3B3B3]
                            overflow-y-scroll lg:text-sm
                            h-screen scrollbar-hide w-52
                            hidden md:inline
                            ">
            <div className="space-y-4">
                {/* {Button} */}
                <Navbar />

                {/* {Playlist} */}
                <Playlist />

            </div>
        </div>
    )
}

export default Sidebar
