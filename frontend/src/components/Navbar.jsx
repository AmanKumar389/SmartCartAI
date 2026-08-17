import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {
    FaShoppingCart,
    FaBoxOpen,
    FaUserCircle,
    FaSearch,
    FaHeart,
    FaUserShield
} from "react-icons/fa";

function Navbar({ search, setSearch }) {

    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const [cartCount, setCartCount] = useState(0);

    const loadCartCount = () => {
        axios.get("http://localhost:8080/cart")
            .then((res) => {
                setCartCount(res.data.length);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        loadCartCount();
    }, []);

    const logout = () => {
        localStorage.removeItem("token");
        alert("Logout Successful");
        navigate("/");
        window.location.reload();
    };

    return (
        <nav
            style={{
                background: "#2874F0",
                padding: "12px 30px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                color: "white",
                position: "sticky",
                top: 0,
                zIndex: "1000",
                boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
            }}
        >
            {/* Logo */}
            <Link
                to="/"
                style={{
                    color: "white",
                    textDecoration: "none",
                    fontSize: "28px",
                    fontWeight: "bold",
                }}
            >
                🛒 SmartCart AI
            </Link>

            {/* Search */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    background: "white",
                    borderRadius: "6px",
                    width: "38%",
                    padding: "8px 12px",
                }}
            >
                <FaSearch color="gray" />

                <input
                    type="text"
                    placeholder="Search Products..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{
                        width: "100%",
                        border: "none",
                        outline: "none",
                        marginLeft: "10px",
                        fontSize: "15px",
                    }}
                />
            </div>

            {/* Right Side */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                }}
            >
                {!token ? (
                    <>
                        <Link to="/login">
                            <button>Login</button>
                        </Link>

                        <Link to="/signup">
                            <button>Signup</button>
                        </Link>
                    </>
                ) : (
                    <>
                        <Link
                            to="/profile"
                            style={{ textDecoration: "none", color: "white" }}
                        >
                            <button>
                                <FaUserCircle /> Profile
                            </button>
                        </Link>

                        <button onClick={logout}>
                            Logout
                        </button>
                    </>
                )}

                <Link to="/orders">
                    <button>
                        <FaBoxOpen /> Orders
                    </button>
                </Link>

                <Link to="/wishlist">
                    <button>
                        <FaHeart /> Wishlist
                    </button>
                </Link>

                <Link to="/admin">
                    <button>
                        <FaUserShield /> Admin
                    </button>
                </Link>

                <Link
                    to="/cart"
                    style={{
                        position: "relative",
                        textDecoration: "none"
                    }}
                >
                    <button>
                        <FaShoppingCart /> Cart
                    </button>

                    {cartCount > 0 && (
                        <span
                            style={{
                                position: "absolute",
                                top: "-8px",
                                right: "-8px",
                                background: "red",
                                color: "white",
                                borderRadius: "50%",
                                width: "22px",
                                height: "22px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                fontSize: "12px",
                                fontWeight: "bold"
                            }}
                        >
                            {cartCount}
                        </span>
                    )}
                </Link>

            </div>
        </nav>
    );
}

export default Navbar;