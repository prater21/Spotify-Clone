import "./Layout.css"
import Body from "./Body";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";


const Layout = () => {
    return (
        <div className="layout">
            <div className="layout__body">
                <Sidebar />
                <div className="layout__main">
                    <Topbar />
                    <Body />
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Layout;


