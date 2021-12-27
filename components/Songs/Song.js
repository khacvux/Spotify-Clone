import { useRecoilState } from "recoil";
import { currentTrackIdState, isPlayingState } from "../../atoms/songAtom";
import useSpotify from "../../hooks/useSpotify"
import { millisToMinutesAndSecconds } from "../../lib/time";

function Song({order, track}) {

    const spotifyApi = useSpotify();
    const [currentTrackID, setCurrentTrackId] = useRecoilState(currentTrackIdState);

    const[isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

    const playSong = () => {
        setCurrentTrackId(track.track.id);
        setIsPlaying(true);
        spotifyApi.play({
            uris: [track.track.uri],
        });
    }


    return (
        <div 
            className="grid grid-cols-2 hover:bg-gray-800 px-4 py-2 rounded-md text-gray-500 cursor-pointer"
            onClick={playSong}
        >
            <div className="flex items-center space-x-4">
                <p className=" w-5 flex justify-center">{ order + 1 }</p>
                <img 
                    className="h-10 w-10"
                    src={track.track.album.images[0].url}
                />
                <div>
                    <p className=" font-light w-36 lg:w-64 truncate text-white">{track.track.name}</p>
                    <p className=" text-xs w-40">{track.track.artists[0].name}</p>
                </div>
            </div>

            <div className="flex items-center justify-between ml-auto md:ml-0">
                <p className="hidden md:inline text-sm w-40">{track.track.album.name}</p>
                <p className="text-sm">{millisToMinutesAndSecconds(track.track.duration_ms)}</p>
            </div>
        </div>
        
    )
}

export default Song
