import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Categories from "./components/Categories";
import Banner from "./components/Banner";
import Products from "./components/Products";
import ProductDetails from "./components/ProductDetails";
import Cart from "./components/Cart";
import Wishlist from "./components/Wishlist";
import OrderHistory from "./components/OrderHistory";
import Payment from "./components/Payment";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Admin from "./components/Admin";
import Profile from "./components/Profile";
import Footer from "./components/Footer";
import ChatBot from "./components/ChatBot";
import "./App.css";

function Home({ search, category, setCategory }) {
    return (
        <>
            <Categories setCategory={setCategory} />
            <Banner />
            <Products search={search} category={category} />

            <div
                style={{
                    textAlign: "center",
                    marginTop: "40px",
                    marginBottom: "40px",
                }}
            >
                <h1>Welcome to SmartCart AI 🤖</h1>
                <p>Your AI Powered Shopping Assistant</p>
            </div>
        </>
    );
}

function App() {

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");

    return (
        <>
            <Navbar
                search={search}
                setSearch={setSearch}
            />

            <Routes>

                <Route
                    path="/"
                    element={
                        <Home
                            search={search}
                            category={category}
                            setCategory={setCategory}
                        />
                    }
                />

                <Route
                    path="/product/:id"
                    element={<ProductDetails />}
                />

                <Route
                    path="/cart"
                    element={<Cart />}
                />

                <Route
                    path="/wishlist"
                    element={<Wishlist />}
                />

                <Route
                    path="/orders"
                    element={<OrderHistory />}
                />

                <Route
                    path="/payment"
                    element={<Payment />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/signup"
                    element={<Signup />}
                />

                <Route
                    path="/admin"
                    element={<Admin />}
                />

                <Route
                    path="/profile"
                    element={<Profile />}
                />

            </Routes>

            <Footer />

            <ChatBot />

        </>
    );
}

export default App;