import { useSession } from "next-auth/react";
import { useEffect, useState } from "react"
import { useRecoilState } from "recoil";
import { playlistIdState } from "../../atoms/playlistAtom";
import useSpotify from "../../hooks/useSpotify";



function Playlist() {
   const spotifyApi = useSpotify();
   const { data: session, status } = useSession();
   const [playlists, setPlaylists] = useState([]);
   const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);

   useEffect(() => {
      if(spotifyApi.getAccessToken()){
         spotifyApi.getUserPlaylists().then((data) => {
            setPlaylists(data.body.items);
         });
      }  
   }, [session, spotifyApi])

   console.log(playlistId)

   return (
      <ul className="space-y-4">
         {playlists.map((playlist) => (
            <li
               key={playlist.id} 
               onClick={() => setPlaylistId(playlist.id)}
               className="hover:text-white cursor-pointer">
               {playlist.name}
            </li>
         ))}
         
         
      </ul>
    )
}

export default Playlist
