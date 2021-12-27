import {
    HomeIcon,
    SearchIcon,
    LibraryIcon,
    PlusCircleIcon,
    RssIcon,
    HeartIcon,
}   from "@heroicons/react/outline";
import { useSession } from "next-auth/react";

function Navbar() {
    const { data: session, status } = useSession();


    return (
        <div className="space-y-4">
            <button className="flex items-center gap-2 hover:text-white">
                <HomeIcon className=" h-5 w-5"/>
                <p>Home</p>
            </button>
            <button className="flex items-center gap-2 hover:text-white">
                <SearchIcon className=" h-5 w-5"/>
                <p>Search</p>
            </button>
            <button className="flex items-center gap-2 hover:text-white">
                <LibraryIcon className=" h-5 w-5"/>
                <p>Your Library</p>
            </button>
            

            <button className="flex items-center gap-2 hover:text-white">
                <PlusCircleIcon className=" h-5 w-5"/>
                <p>Create Playlist</p>
            </button>
            <button className="flex items-center gap-2 hover:text-white">
                <RssIcon className=" h-5 w-5"/>
                <p>Your episode</p>
            </button>
            <button className="flex items-center gap-2 hover:text-white">
                <HeartIcon className=" h-5 w-5"/>
                <p>Like Song</p>
            </button>
            <hr className="border-t-[0.1px] border-gray-700 mb-10"></hr>
        </div>
    )
}

export default Navbar
