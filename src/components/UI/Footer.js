import "./Footer.css"
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import VolumeUpOutlinedIcon from '@mui/icons-material/VolumeUpOutlined';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import Slider from '@mui/material/Slider';
import { useState } from "react";
import { spotify } from "../config/spotify";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/user-slice";


const Footer = () => {
    const [playing, setPlaying] = useState(false);
    const [volume, setVolume] = useState(30);
    const [popOver, setPopOver] = useState(false);

    const nowSong = useSelector(state => state.user.nowSong);
    const playlist = useSelector(state => state.user.playlist);
    const index = useSelector(state => state.user.index)
    const avaliableDevice = useSelector(state => state.user.avaliableDevice);

    const dispatch = useDispatch();

    //pause handler
    const pauseHandler = () => {
        spotify.pause()
            .then(function () {
                // console.log('Footer pause btn');
            }, function (err) {
                console.log('footer pause handler Error', err);
            });
        setPlaying(prev => { return !prev });
    }

    //play handler
    const playHandler = () => {
        spotify.play()
            .then(function () {
                // console.log('Footer play btn');
            }, function (err) {
                console.log('footer play handler Error', err);
            });
        setPlaying(prev => { return !prev });
    }

    //skip to previous song
    const toPrevHandler = () => {
        spotify.skipToPrevious()
            .then(function () {
                // console.log('Skip to previous');
            }, function (err) {
                console.log('Skip to previous Error', err);
            });

        let _index = index - 1;
        if (_index < 0) {
            dispatch(userActions.setIndex({ index: playlist.length - 1 }));
            _index = playlist.length - 1;
        }
        else
            dispatch(userActions.setIndex({ index: _index }));
        dispatch(userActions.setNowSong({ nowSong: playlist[_index].track }))

    }

    //skip to next song
    const toNextHandler = () => {
        spotify.skipToNext()
            .then(function () {
                // console.log('Skip to next');
            }, function (err) {
                console.log('Skip to next Error', err);
            });

        let _index = index + 1;
        if (_index >= playlist.length) {
            dispatch(userActions.setIndex({ index: 0 }));
            _index = 0;
        }
        else
            dispatch(userActions.setIndex({ index: _index }));
        dispatch(userActions.setNowSong({ nowSong: playlist[_index].track }))
    }

    //set device volume, but doesn't work apple device
    const volumeControlHandler = (e) => {
        setVolume(e.target.value);
        spotify.setVolume(parseInt(e.target.value))
            .then(function () {
                // console.log('Setting volume');
            }, function (err) {
                console.log('Setting volume Error', err);
            });
    }
    //show available devices
    const onPopoverHandler = () => {
        setPopOver(prev => { return !prev });
    }
    //change device handler
    const deviceChangeHandler = (id) => {
        dispatch(userActions.setNowDevice({ nowDevice: id }))
        spotify.play({ device_id: id })
            .then(function () {
                // console.log('Change device');
            }, function (err) {
                console.log('Change device Error', err);
            });
    }

    return (
        <div className="footer" >
            <div className="footer__left">
                <img
                    className="footer__albumImg"
                    src={nowSong?.album.images[0].url}
                    alt={nowSong?.name}
                />
                {nowSong ? (
                    <div className="footer__songInfo">
                        <h4>{nowSong.name}</h4>
                        <p>{nowSong.artists.map((artist) => artist.name).join(", ")}</p>
                    </div>
                ) : (
                    <div className="footer__songInfo">
                        <h4>No song is playing</h4>
                        <p>...</p>
                    </div>
                )}
            </div>
            <div className="footer__center">
                <SkipPreviousIcon onClick={toPrevHandler} className="footer__icon" />
                {!playing ? (
                    <PauseCircleOutlineIcon
                        onClick={pauseHandler}
                        fontSize="large"
                        className="footer__icon"
                    />
                ) : (
                    <PlayCircleOutlineIcon
                        onClick={playHandler}
                        fontSize="large"
                        className="footer__icon"
                    />
                )}
                < SkipNextIcon className="footer__icon" onClick={toNextHandler} />
            </div>
            <div className="footer__right">
                <div className="footer__volume" >
                    <PhoneIphoneIcon
                        onClick={onPopoverHandler} />
                    <div className="footer__devices" style={!popOver ? { display: "none" } : { display: "block" }}>
                        <p className="footer__deviceTitle">Avaliable devices</p>
                        <hr />
                        {avaliableDevice?.map(device =>
                            <li className="footer__device" key={device.id} onClick={() => { deviceChangeHandler(device.id) }}>
                                {device.name}
                            </li>)}
                    </div>
                    <VolumeUpOutlinedIcon />
                    <Slider aria-label="Volume"
                        onChange={volumeControlHandler}
                        value={volume}
                        defaultValue={30}
                        step={5}
                        min={0}
                        max={100} />
                </div>
            </div>

        </div>
    )
}

export default Footer;