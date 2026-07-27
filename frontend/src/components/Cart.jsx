import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Cart() {

    const navigate = useNavigate();

    const [cartItems, setCartItems] = useState([]);

    const loadCart = () => {
        axios.get("http://localhost:8080/cart")
            .then((res) => {
                setCartItems(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        loadCart();
    }, []);

    const removeItem = (id) => {
        axios.delete(`http://localhost:8080/cart/${id}`)
            .then(() => {
                alert("Item Removed");
                loadCart();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    // Update Quantity
    const updateQuantity = (item, newQuantity) => {

        if (newQuantity < 1) return;

        axios.put(`http://localhost:8080/cart/${item.id}`, {
            productId: item.productId,
            productName: item.productName,
            price: item.price,
            quantity: newQuantity
        })
            .then(() => {
                loadCart();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const totalPrice = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    return (
        <div style={{ padding: "40px" }}>

            <h1 style={{ textAlign: "center" }}>🛒 My Cart</h1>

            {cartItems.length === 0 ? (
                <h2 style={{ textAlign: "center" }}>Your Cart is Empty</h2>
            ) : (
                <>
                    {cartItems.map((item) => (
                        <div
                            key={item.id}
                            style={{
                                border: "1px solid lightgray",
                                borderRadius: "10px",
                                padding: "20px",
                                marginBottom: "20px",
                                boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                            }}
                        >
                            <h2>{item.productName}</h2>

                            <p>Price: ₹{item.price}</p>

                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "15px",
                                    margin: "15px 0"
                                }}
                            >
                                <button
                                    onClick={() =>
                                        updateQuantity(item, item.quantity - 1)
                                    }
                                    style={{
                                        width: "35px",
                                        height: "35px",
                                        fontSize: "20px",
                                        cursor: "pointer"
                                    }}
                                >
                                    -
                                </button>

                                <h3>{item.quantity}</h3>

                                <button
                                    onClick={() =>
                                        updateQuantity(item, item.quantity + 1)
                                    }
                                    style={{
                                        width: "35px",
                                        height: "35px",
                                        fontSize: "20px",
                                        cursor: "pointer"
                                    }}
                                >
                                    +
                                </button>
                            </div>

                            <h3>Total: ₹{item.price * item.quantity}</h3>

                            <button
                                onClick={() => removeItem(item.id)}
                                style={{
                                    background: "red",
                                    color: "white",
                                    border: "none",
                                    padding: "10px 20px",
                                    borderRadius: "5px",
                                    cursor: "pointer"
                                }}
                            >
                                Remove
                            </button>
                        </div>
                    ))}

                    <h2>Total Cart Price: ₹{totalPrice}</h2>

                    <button
                        onClick={() =>
                            navigate("/payment", {
                                state: {
                                    cartItems: cartItems,
                                    totalPrice: totalPrice
                                }
                            })
                        }
                        style={{
                            background: "green",
                            color: "white",
                            border: "none",
                            padding: "12px 25px",
                            borderRadius: "5px",
                            cursor: "pointer",
                            marginTop: "20px"
                        }}
                    >
                        Proceed to Payment
                    </button>
                </>
            )}

        </div>
    );
}

export default Cart;