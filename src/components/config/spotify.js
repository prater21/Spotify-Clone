import SpotifyWebApi from "spotify-web-api-node"

//유저가 로그인 버튼 누르면 이 주소로 감   
export const authEndpoint = "https://accounts.spotify.com/authorize";

//로그인 성공하면 여기로 redirect
// const redirectUri = "https://prater21.github.io/Spotify-Clone/";
const redirectUri = "http://localhost:3000/"
const clientId = process.env.REACT_APP_CLIENT_ID;
const clientSecret = process.env.REACT_APP_CLIENT_SECRET;

export const spotify = new SpotifyWebApi({ clientId, clientSecret, redirectUri });


//Scopes provide Spotify users using third-party apps the confidence 
//that only the information they choose to share will be shared
const scopes = [
    "user-read-currently-playing",
    "user-read-recently-played",
    "user-read-playback-state",
    "user-top-read",
    "user-modify-playback-state",
    "streaming"
];

//get Access Token
export const getTokenFromUrl = () => {
    return window.location.hash
        .substring(1)
        .split("&")
        .reduce((initial, item) => {
            var parts = item.split("=");
            initial[parts[0]] = decodeURIComponent(parts[1]);

            return initial;
        }, {});
}


//https://developer.spotify.com/documentation/general/guides/authorization/code-flow/
//to login spotify
export const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`;
