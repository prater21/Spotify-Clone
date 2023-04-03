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
        avaliableDevice: null,
        nowDevice: null,
        nowSong: null,
        index: 0,
    },
    reducers: {
        setName(state, action) {
            state.name = action.payload.name;
        },
        setUser(state, action) {
            state.user = action.payload.user;
        },
        setPlaylists(state, action) {
            state.playlists = action.payload.playlists;
        },
        setToken(state, action) {
            state.token = action.payload.token;
        },
        setPlaylist(state, action) {
            state.playlist = action.payload.playlist;
        },
        setPlaylistId(state, action) {
            state.playlistId = action.payload.playlistId;
        },
        setPlaylistTitle(state, action) {
            state.playlistTitle = action.payload.playlistTitle;
        },
        setAvaliabledevice(state, action) {
            state.avaliableDevice = action.payload.avaliableDevice;
        },
        setNowDevice(state, action) {
            state.nowDevice = action.payload.nowDevice;
        },
        setNowSong(state, action) {
            state.nowSong = action.payload.nowSong;
        },
        setIndex(state, action) {
            state.index = action.payload.index;
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