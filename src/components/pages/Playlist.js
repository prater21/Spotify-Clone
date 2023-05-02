/**
 * playlist page component
 */
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/user-slice";
import { spotify } from "../config/spotify";
import PlaylistItem from "../PlaylistItem"

const Playlist = () => {
    const { playlistId } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        if (playlistId) {
            //get playlist from playlistID
            spotify.getPlaylistTracks(playlistId)
                .then(data => {
                    dispatch(userActions.setPlaylist({ playlist: data.body.items }))
                    dispatch(userActions.setPlaylistId({ playlistId }))
                })
        }

    }, [playlistId, dispatch]);

    return <PlaylistItem />
}

export default Playlist;
