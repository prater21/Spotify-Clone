import { Outlet } from "react-router-dom";
import "./Body.css"


const Body = () => {
    return (
        <div className="body">
            <div className="body__main">
                <Outlet />
                <div className="body__margin"></div>
            </div>

        </div>
    )
}

export default Body;