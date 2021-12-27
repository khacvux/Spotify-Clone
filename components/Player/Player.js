import { ArrowCircleLeftIcon, ArrowCircleRightIcon, RefreshIcon, SwitchHorizontalIcon } from "@heroicons/react/outline";
import { PauseIcon, PlayIcon } from "@heroicons/react/solid";
import { debounce } from "lodash";
import { useSession } from "next-auth/react";
import { useState, useEffect, useCallback } from "react";
import { useRecoilState } from "recoil";
import { currentTrackIdState, isPlayingState } from "../../atoms/songAtom";
import useSongInfo from "../../hooks/useSongInfo";
import useSpotify from "../../hooks/useSpotify"

function Player() {
    const spotifyApi = useSpotify();
    const { data: session, status } = useSession();
    const [currentTrackId, setCurrentIdTrack] = 
        useRecoilState(currentTrackIdState);
    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
    const [volume, setVolume] = useState(50);

    const songInfo = useSongInfo();

    const fetchCurrentSong = () => {
        if(!songInfo){
            spotifyApi.getMyCurrentPlayingTrack().then(data => {
                console.log("now playing: " + data.body?.item)
                setCurrentIdTrack(data.body?.item?.id);

                spotifyApi.getMyCurrentPlaybackState().then((data) => {
                    setIsPlaying(data.body?.is_playing);
                })
            })
        }
    }

    const handlePlayPause = () => {
        spotifyApi.getMyCurrentPlaybackState().then((data) => {
            if(data.body.is_playing) {
                spotifyApi.pause();
                setIsPlaying(false);
            } else{
                spotifyApi.play();
                setIsPlaying(true);
            }
        });
    }

    useEffect(() => {
        if(spotifyApi.getAccessToken() && !currentTrackId){

            fetchCurrentSong();
            setVolume(50);
        }
    }, [currentTrackIdState, spotifyApi, session])

    useEffect(() => {
        if(volume > 0 && volume < 100){
            debouncedAdjustVolume(volume);
        }
    }, [volume])

    const debouncedAdjustVolume = useCallback(
        debounce((volume) => {
            spotifyApi.setVolume(volume).catch((err) => {})
        }, 500),
        []
    )
    

    return (
        <div className="text-white h-24 bg-[#181818] grid grid-cols-3 text-xs md:text-base px-2 md:px-8">

            {/* { songInfo } */}
            <div className="flex items-center space-x-4">
                <img 
                    className="hidden md:inline h-14 w-14 "
                    src={songInfo?.album?.images?.[0]?.url}
                />
                <div>
                    <h3 className=" text-sm">{songInfo?.name}</h3>
                    <p className=" text-xs font-thin truncate">{songInfo?.artists?.[0]?.name}</p>
                </div>
            </div>

            {/* { control } */}
            <div className="flex items-center justify-center space-x-7">
                <SwitchHorizontalIcon className="button small-button"/>
                <ArrowCircleLeftIcon className=" button small-button" />
                {isPlaying ? (
                    <PauseIcon onClick={handlePlayPause} className=" button h-10 w-10"  />
                ) : (
                    <PlayIcon onClick={handlePlayPause} className=" button h-10 w-10" />
                )}
                <ArrowCircleRightIcon className=" button small-button" />
                <RefreshIcon className="button small-button" />
            </div>

            {/* { Volume } */}
            <div className="flex items-center space-x-3 md:space-x-4 justify-end">
                <svg xmlns="http://www.w3.org/2000/svg" 
                    className="button small-button" 
                    fill="none" viewBox="0 0 24 24" 
                    stroke="currentColor"
                    onClick={() => volume > 0 && setVolume(volume - 10)}    
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                </svg>
                <input 
                    type="range" 
                    value={volume} 
                    min={0} 
                    max={100} 
                    className="w-14 md:w-28"
                    onChange={(e) => setVolume(Number(e.target.value))}
                />
                <svg xmlns="http://www.w3.org/2000/svg" 
                    className="button small-button" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                    onClick={() => volume < 100 && setVolume(volume + 10)}    
                >
                    <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
                </svg>
            </div>

        </div>
    )
}

export default Player
