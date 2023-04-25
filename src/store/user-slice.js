/**
 * user data
 */

import { configureStore } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        name: null,
        playlists: [],
        playlist: null,
        playlistId: null,
        playlistTitle: null,
        token: null,
        availableDevice: null,
        nowDevice: null,
        nowSong: null,
        index: 0,
        isPlaying: false
    },
    reducers: {
        //set user name
        setName(state, action) {
            state.name = action.payload.name;
        },
        //set user
        setUser(state, action) {
            state.user = action.payload.user;
        },
        // set user's playlists
        setPlaylists(state, action) {
            state.playlists = action.payload.playlists;
        },
        // set user token
        setToken(state, action) {
            state.token = action.payload.token;
        },
        // set specific playlist
        setPlaylist(state, action) {
            state.playlist = action.payload.playlist;
        },
        // set specific playlist ID
        setPlaylistId(state, action) {
            state.playlistId = action.payload.playlistId;
        },
        // set playlist title
        setPlaylistTitle(state, action) {
            state.playlistTitle = action.payload.playlistTitle;
        },
        //set available devices
        setAvailabledevice(state, action) {
            state.availableDevice = action.payload.availableDevice;
        },
        // set now playing device
        setNowDevice(state, action) {
            state.nowDevice = action.payload.nowDevice;
        },
        //set now playing song
        setNowSong(state, action) {
            state.nowSong = action.payload.nowSong;
        },
        //set now playing song index
        setIndex(state, action) {
            state.index = action.payload.index;
        },
        //set now playing song index
        setIsPlaying(state, action) {
            state.isPlaying = action.payload.isPlaying;
        }
    }
});

export const userActions = userSlice.actions;

const store = configureStore({
    reducer: {
        user: userSlice.reducer
    }
})


export default store;