/**
 * playlist component
 */

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../store/user-slice";
import { spotify } from "./config/spotify";
import "./PlaylistItem.css"

const PlaylistItem = () => {
    const playlist = useSelector(state => state.user.playlist);
    const playlistTitle = useSelector(state => state.user.playlistTitle);
    const nowDevice = useSelector(state => state.user.nowDevice)
    const playlistId = useSelector(state => state.user.playlistId)

    const [imgSrc, setImgSrc] = useState("");
    const dispatch = useDispatch();

    //track click
    const onTrackClickHandler = (track, index) => {

        dispatch(userActions.setNowSong({ nowSong: track }))
        //set song index
        dispatch(userActions.setIndex({ index: index }));
        dispatch(userActions.setIsPlaying({ isPlaying: true }));

        //play song
        spotify.play({ context_uri: `spotify:playlist:${playlistId}`, offset: { position: index }, device_id: nowDevice })
            .then(function () {
                // console.log('Play song');
            }, function (err) {
                console.log('play Error', err);
            });
    }

    useEffect(() => {
        //set playlist top image src
        if (playlist) {
            const src = playlist[0].track.album.images.length ? playlist[0].track.album.images[0].url : "";
            setImgSrc(src);
        }
    }, [playlist]);


    return <>
        <div className="playlist__top" >
            <img className="playlist__img" alt="playlist top img" src={imgSrc} />
            <div className="playlist__description">
                <p>플레이리스트</p>
                <p className="playlist__title">{playlistTitle}</p>
            </div>
        </div>

        <div className="playlist__border">
            <p className="playlist__titleIcon">#</p>
            <p className="playlist__titleTitle">제목</p>
            <p className="playlist__titleAlbum">앨범</p>
            <p className="playlist__titleAddedDate">추가한 날짜</p>
            <p className="playlist__titleDuration">시간</p>
        </div>
        <hr className="playlist__hr"></hr>

        {/* playlist tracks */}
        <ul className="playlist__tracks">
            {playlist?.map((track, index) =>
                <li key={track.id} className="playlist__track" onClick={() => { onTrackClickHandler(track.track, index) }}>
                    <p className="playlist__trackNumber">{index + 1}</p>
                    <div className="playlist__trackTitle">
                        <img className="playlist__trackImg" alt='' src={track.track.album.images.length ? track.track.album.images[0].url : ""} />
                        <div className="playlist__trackName">
                            <p>{track.track.name}</p>
                            <ul className="playlist__artistName" >
                                {track.track.artists?.map(artist =>
                                    <li key={artist.id}>{artist.name}</li>)}
                            </ul>
                        </div>
                    </div>
                    <p className="playlist__trackAlbum">{track.track.album.name}</p>
                    <p className="playlist__trackAddedDate">{track.added_at.substr(0, 10)}</p>
                    <p className="playlist__trackDuration">{(Math.floor(track.track.duration_ms / 60000) % 60) + ":" + String(Math.floor((track.track.duration_ms / 1000) % 60)).padStart(2, "0")}</p>
                </li>
            )}
        </ul>
    </>
}

export default PlaylistItem;
