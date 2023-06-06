/**
 * layout component
 */
import "./Layout.css"
import Body from "./Body";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const Layout = () => {
    return (
        <div className="layout">
            <Sidebar />
            <div className="layout__main">
                <Topbar />
                <Body />
            </div>
            <Footer />
        </div>
    )
}

export default Layout;


