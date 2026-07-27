import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Signup() {

    const navigate = useNavigate();

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const register = async () => {

        try {

            const response = await axios.post(
                "http://localhost:8080/api/auth/register",
                user
            );

            alert("✅ Registration Successful");

            console.log(response.data);

            navigate("/login");

        } catch (err) {

            console.log("Full Error:", err);

            if (err.response) {

                alert(
                    "Status : " + err.response.status +
                    "\n\nMessage : " +
                    JSON.stringify(err.response.data)
                );

            } else if (err.request) {

                alert(
                    "Server is not responding.\n\nPlease check if Spring Boot is running on port 8080."
                );

            } else {

                alert(err.message);

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

            <h1>Signup</h1>

            <input
                type="text"
                name="name"
                placeholder="Enter Name"
                value={user.name}
                onChange={handleChange}
                style={{
                    width: "100%",
                    padding: "10px",
                    marginBottom: "15px"
                }}
            />

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
                onClick={register}
                style={{
                    width: "100%",
                    padding: "12px",
                    background: "green",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer"
                }}
            >
                Signup
            </button>

            <br /><br />

            <Link to="/login">
                Already have an account? Login
            </Link>

        </div>
    );
}

export default Signup;