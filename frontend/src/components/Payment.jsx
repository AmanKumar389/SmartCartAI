import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function Payment() {

    const navigate = useNavigate();
    const location = useLocation();

    const cartItems = location.state?.cartItems || [];
    const totalPrice = location.state?.totalPrice || 0;

    const paymentSuccess = async () => {

        if (cartItems.length === 0) {
            alert("Cart is Empty");
            navigate("/cart");
            return;
        }

        try {

            const order = {
                customerName: "Aman Kumar",
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

            alert("✅ Payment Successful");

            navigate("/orders");

        } catch (err) {
            console.log(err);
            alert("Payment Failed");
        }
    };

    return (
        <div style={{ padding: "40px", textAlign: "center" }}>

            <h1>💳 Payment</h1>

            <h2>Select Payment Method</h2>

            <div style={{ marginTop: "30px" }}>

                <label>
                    <input type="radio" name="payment" defaultChecked />
                    UPI
                </label>

                <br /><br />

                <label>
                    <input type="radio" name="payment" />
                    Credit / Debit Card
                </label>

                <br /><br />

                <label>
                    <input type="radio" name="payment" />
                    Cash on Delivery
                </label>

                <br /><br />

                <h3>Total Amount: ₹{totalPrice}</h3>

                <br />

                <button
                    onClick={paymentSuccess}
                    style={{
                        background: "green",
                        color: "white",
                        border: "none",
                        padding: "12px 30px",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontSize: "16px"
                    }}
                >
                    Pay Now
                </button>

            </div>

        </div>
    );
}

export default Payment;