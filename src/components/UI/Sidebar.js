import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { userActions } from "../../store/user-slice";
import "./Sidebar.css"


const Sidebar = () => {
    const playlists = useSelector(state => state.user.playlists);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onPlaylistTitleHandler = (title) => {
        dispatch(userActions.setPlaylistTitle({ playlistTitle: title }))
    }

    const imgClickHandler = () => {
        navigate('/');
    }
    return (
        <div className="sidebar">
            <img className="sidebar__logo"
                onClick={imgClickHandler}
                src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
                alt="" />
            <NavLink to="/"
                className={({ isActive }) => (isActive ? "sidebar__menu active" : "sidebar__menu")}>
                Home
            </NavLink>
            <p className="sidebar__menu">Search</p>
            <p className="sidebar__menu">Library</p>
            <br></br>
            <strong className="sidebar__title">PLAYLISTS</strong>
            <hr />
            <ul className="sidebar__playlists">
                {playlists?.map(playlist =>
                    <li key={playlist.id} className="sidebar_playlist">
                        <NavLink
                            to={"playlist/" + playlist.id}
                            className={({ isActive }) => (isActive ? "active" : undefined)} onClick={() => { onPlaylistTitleHandler(playlist.name) }}>
                            {playlist.name}
                        </NavLink>
                    </li>
                )}
            </ul>

        </div >
    )
}

export default Sidebar;