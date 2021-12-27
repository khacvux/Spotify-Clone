import { ChevronDownIcon } from "@heroicons/react/outline";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { shuffle } from "lodash";
import { useRecoilState, useRecoilValue } from "recoil";
import { playlistState, playlistIdState } from "../../atoms/playlistAtom";
import useSpotify from "../../hooks/useSpotify";
import Songs from "../Songs/Songs";

const colors = [
    "from-indigo-400",
    "from-blue-400",
    "from-green-400",
    "from-red-400",
    "from-yellow-400",
    "from-pink-400",
    "from-purple-400",
];

function Center() {
    const spotifyApi = useSpotify();
    const { data: session} = useSession();
    const [ color, setColor ] = useState(null);
    const playlistId = useRecoilValue(playlistIdState);
    const [playlist, setPlaylist] = useRecoilState(playlistState)

    
    useEffect(() => {
        setColor(shuffle(colors).pop());
    }, [playlistId]);

    useEffect(() => {
        spotifyApi
        .getPlaylist(playlistId)
        .then((data) => {
            setPlaylist(data.body);
        })
        .catch((err) => console.log("Something went wrong!", err));
    }, [spotifyApi, playlistId])


    return (
        <div className="flex flex-grow text-white flex-col h-screen overflow-y-scroll">
            <header className="absolute top-2 right-8 ">
                <div className=" flex items-center bg-black space-x-3 opacity-90 hover:opacity-80 cursor-pointer p-1 pr-2 rounded-full "
                    onClick={() => signOut()}    
                >
                    <img className=" rounded-full w-7 h-7" src={session?.user.image}></img>
                    <h2 className=" text-sm">{session?.user.name}</h2>
                    <ChevronDownIcon className="h-3 w-3"/>
                </div>
            </header>
            <section 
                className={`flex items-center space-x-7 bg-gradient-to-b to-[#050505] ${color} h-72 flex-row px-10 pointer-events-none py-7`}
            >
                <img 
                    className=" w-56 h-56 shadow-2xl"
                    src={playlist?.images?.[0]?.url} 
                />
                <div className="flex-grow ">
                    <p>PLAYLIST</p>
                    <h1 className=" text-3xl md:text-3xl xl:text-8xl font-bold">{playlist?.name}</h1>
                </div>
            </section>
            <div>
                <Songs />
            </div>
        </div>
    )
}

export default Center
 