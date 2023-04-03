import { useSelector } from "react-redux";
import "./Topbar.css"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";


const Topbar = () => {
    const name = useSelector(state => state.user.name);
    const navigate = useNavigate();
    const onClickHandler = () => {
        navigate(-1);
    }

    return (
        <div className="topbar">
            <div onClick={onClickHandler}>
                <ArrowBackIcon className="topbar__goback" />
            </div>
            <p className="topbar__username">{name}</p>
        </div>
    )
}

export default Topbar; 