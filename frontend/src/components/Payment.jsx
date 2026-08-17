import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function Payment() {

    const navigate = useNavigate();
    const location = useLocation();

    const cartItems = location.state?.cartItems || [];
    const totalPrice = location.state?.totalPrice || 0;

    const [name, setName] = useState("Aman Kumar");
    const [mobile, setMobile] = useState("");
    const [address, setAddress] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("UPI");

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);
    }, []);

    const paymentSuccess = async () => {

        if (cartItems.length === 0) {
            alert("Cart is Empty");
            navigate("/cart");
            return;
        }

        if (!mobile || !address) {
            alert("Please fill all details");
            return;
        }

        try {

            // Cash On Delivery
            if (paymentMethod === "COD") {

                const order = {
                    customerName: name,
                    productName: cartItems.map(item => item.productName).join(", "),
                    quantity: cartItems.reduce((sum, item) => sum + item.quantity, 0),
                    totalPrice: totalPrice
                };

                await axios.post("http://localhost:8080/orders", order);

                await Promise.all(
                    cartItems.map(item =>
                        axios.delete(`http://localhost:8080/cart/${item.id}`)
                    )
                );

                alert("Order Placed Successfully!");

                navigate("/orders");
                return;
            }

            // Create Razorpay Order
            const response = await axios.post(
                `http://localhost:8080/payment/create-order?amount=${totalPrice}`
            );

            const options = {
                key: "rzp_live_TIv6SKloMO0dQX",

                amount: response.data.amount,
                currency: response.data.currency,
                order_id: response.data.id,

                name: "SmartCart AI",
                description: "Shopping Payment",

                handler: async function (paymentResponse) {

                    console.log(paymentResponse);

                    const order = {
                        customerName: name,
                        productName: cartItems.map(item => item.productName).join(", "),
                        quantity: cartItems.reduce((sum, item) => sum + item.quantity, 0),
                        totalPrice: totalPrice,
                        status: "Panding"
                    };

                    await axios.post("http://localhost:8080/orders", order);

                    await Promise.all(
                        cartItems.map(item =>
                            axios.delete(`http://localhost:8080/cart/${item.id}`)
                        )
                    );

                    alert("Payment Successful!");

                    navigate("/orders");
                },

                prefill: {
                    name: name,
                    contact: mobile
                },

                theme: {
                    color: "#3399cc"
                }
            };

            const razorpay = new window.Razorpay(options);
            razorpay.open();

        } catch (err) {
            console.log(err);
            alert("Payment Failed");
        }
    };

    return (
        <div
            style={{
                maxWidth: "700px",
                margin: "40px auto",
                background: "#fff",
                padding: "30px",
                borderRadius: "12px",
                boxShadow: "0 0 15px rgba(0,0,0,0.15)"
            }}
        >

            <h1 style={{ textAlign: "center" }}>🛒 Checkout</h1>

            <hr />

            <h2>Delivery Details</h2>

            <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{
                    width: "100%",
                    padding: "10px",
                    marginBottom: "10px"
                }}
            />

            <input
                type="text"
                placeholder="Mobile Number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                style={{
                    width: "100%",
                    padding: "10px",
                    marginBottom: "10px"
                }}
            />

            <textarea
                placeholder="Delivery Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                rows="4"
                style={{
                    width: "100%",
                    padding: "10px"
                }}
            />

            <br />
            <br />

            <h2>Payment Method</h2>

            <label>
                <input
                    type="radio"
                    checked={paymentMethod === "UPI"}
                    onChange={() => setPaymentMethod("UPI")}
                />
                UPI
            </label>

            <br />
            <br />

            <label>
                <input
                    type="radio"
                    checked={paymentMethod === "Card"}
                    onChange={() => setPaymentMethod("Card")}
                />
                Credit / Debit Card
            </label>

            <br />
            <br />

            <label>
                <input
                    type="radio"
                    checked={paymentMethod === "COD"}
                    onChange={() => setPaymentMethod("COD")}
                />
                Cash on Delivery
            </label>

            <hr />

            <h2>Order Summary</h2>

            {cartItems.map(item => (
                <div
                    key={item.id}
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "8px"
                    }}
                >
                    <span>{item.productName}</span>

                    <span>
                        {item.quantity} × ₹{item.price}
                    </span>
                </div>
            ))}

            <hr />

            <h2 style={{ color: "green" }}>
                Total : ₹{totalPrice}
            </h2>

            <button
                onClick={paymentSuccess}
                style={{
                    width: "100%",
                    background: "#28a745",
                    color: "white",
                    padding: "15px",
                    border: "none",
                    borderRadius: "8px",
                    fontSize: "18px",
                    cursor: "pointer"
                }}
            >
                Place Order
            </button>

        </div>
    );
}

export default Payment;