import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Navbar from "../component/Navbar";

const Login = () => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [token, setToken] = useState(null);
    const [errorLogin, setErrorLogin] = useState(null)

    const navigate = useNavigate();

    const handleChangeUserName = (event) => {
        console.log(event);
        setUserName(event.target.value)
    }

    const handleChangePassword = (event) => {
        console.log(event);
        setPassword(event.target.value)
    }

    const handleLogin = async () => {
        const payLoad = {
            username: userName,
            password: password
        };

        try {
            const response = await axios.post(
                "https://api.mudoapi.tech/login",
                payLoad
            );
            console.log(response);
            const token = response.data.data.token;
            setToken(token)

            // menyimpan token ke local storage
            localStorage.setItem("access_token", token)

            setTimeout(() => {
                navigate("/")
            }, 2000)
            
        } catch (error) {
            console.log(error.response);
            const errorMessage = error.response.data.message;
            setErrorLogin(errorMessage)
        }
    };

    return (
        <div className="login">
            <Navbar />
            <div className="login-layout">
                <input onChange={handleChangeUserName} placeholder="masukkan username" />
                <input onChange={handleChangePassword} placeholder="masukkan password" />
                <button onClick={handleLogin}>Login</button>
            </div>
            {token && <h1>Login berhasil</h1>}
            {errorLogin && <h1>{errorLogin}</h1>}
        </div>
    )
}

export default Login