/**
 * login page
 */
import { loginUrl } from "../config/spotify";
import "./Login.css"

const Login = () => {
    return (
        <div className="login">
            <img
                src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
                alt="" />
            <a href={loginUrl}>Login With Spotify</a>
        </div>
    )
}

export default Login;