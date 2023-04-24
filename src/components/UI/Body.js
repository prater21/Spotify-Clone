/**
 * body component
 */
import { Outlet } from "react-router-dom";
import "./Body.css"


const Body = () => {
    return (
        <div className="body">
            <Outlet />
        </div>
    )
}

export default Body;