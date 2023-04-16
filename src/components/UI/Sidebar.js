import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { userActions } from "../../store/user-slice";
import "./Sidebar.css"


const Sidebar = () => {
    const playlists = useSelector(state => state.user.playlists);
    const dispatch = useDispatch();
    const onPlaylistTitleHandler = (title) => {
        dispatch(userActions.setPlaylistTitle({ playlistTitle: title }))
    }

    return (
        <div className="sidebar">
            <img className="sidebar__logo"
                src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
                alt="" />
            <p className="sidebar__menu">Home</p>
            <p className="sidebar__menu">Search</p>
            <p className="sidebar__menu">Library</p>
            <br></br>
            <strong className="sidebar__title">PLAYLISTS</strong>
            <hr />
            <div className="sidebar__main">
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
            </div>

        </div >
    )
}

export default Sidebar;