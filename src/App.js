import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import './App.css';
import { getTokenFromUrl, spotify } from './components/config/spotify';
import Playlist from './components/pages/Playlist';
import Layout from './components/UI/Layout';
import Login from './components/UI/Login';
import { userActions } from './store/user-slice';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='playlist/:playlistId' element={<Playlist />} />
    </Route>
  )
  , { basename: "/Spotify-Clone" }
)


function App() {
  const token = useSelector(state => state.user.token);
  const user = useSelector(state => state.user.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(userActions.setName({ name: user.display_name })); //set username
    }
  }, [user, dispatch]);

  useEffect(() => {
    const hash = getTokenFromUrl() //get token
    window.location.hash = ""; //set url ""
    const _token = hash.access_token;
    if (_token) {
      //set token
      dispatch(userActions.setToken({ token: _token }));
      spotify.setAccessToken(_token);

      //get user info
      spotify.getMe()
        .then((data) => {
          dispatch(userActions.setUser({ user: data.body }));
        })

      //get user's available devices
      spotify.getMyDevices()
        .then(function (data) {
          dispatch(userActions.setAvaliabledevice({ avaliableDevice: data.body.devices }));
        }, function (err) {
          console.log('Something went wrong!', err);
        });
      //get user playlist
      spotify.getUserPlaylists()
        .then(data => {
          dispatch(userActions.setPlaylists({ playlists: data.body.items }));
        })
      //set shuffle false
      spotify.setShuffle(false)
        .then(function () {
          console.log('Shuffle is off.');
        }, function (err) {
          console.log('Something went wrong!', err);
        });
      //set repeat context
      spotify.setRepeat('context')
        .then(function () {
          console.log('Repeat context.');
        }, function (err) {
          console.log('Something went wrong!', err);
        });

    }
  }, [dispatch]);

  return (
    <>
      {
        token ?
          <RouterProvider router={router} />
          : <Login />
      }
    </>
  )
}

export default App;
