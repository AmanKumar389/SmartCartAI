import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {

    const navigate = useNavigate();

    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const login = async () => {

        try {

            const response = await axios.post(
                "http://localhost:8080/api/auth/login",
                user
            );

            localStorage.setItem("token", response.data);

            alert("Login Successful");

            navigate("/");

            window.location.reload();

        } catch (err) {

            console.log(err);

            if (err.response) {
                alert(err.response.data);
            } else {
                alert("Login Failed");
            }

        }
    };

    return (
        <div
            style={{
                width: "400px",
                margin: "60px auto",
                padding: "30px",
                border: "1px solid lightgray",
                borderRadius: "10px",
                textAlign: "center"
            }}
        >

            <h1>Login</h1>

            <input
                type="email"
                name="email"
                placeholder="Enter Email"
                value={user.email}
                onChange={handleChange}
                style={{
                    width: "100%",
                    padding: "10px",
                    marginBottom: "15px"
                }}
            />

            <input
                type="password"
                name="password"
                placeholder="Enter Password"
                value={user.password}
                onChange={handleChange}
                style={{
                    width: "100%",
                    padding: "10px",
                    marginBottom: "20px"
                }}
            />

            <button
                onClick={login}
                style={{
                    width: "100%",
                    padding: "12px",
                    background: "#2874F0",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer"
                }}
            >
                Login
            </button>

            <br /><br />

            <Link to="/signup">
                Don't have an account? Signup
            </Link>

        </div>
    );
}

export default Login;