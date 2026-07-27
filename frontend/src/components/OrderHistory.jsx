import { useEffect, useState } from "react";
import axios from "axios";

function OrderHistory() {

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = () => {
        axios.get("http://localhost:8080/orders")
            .then((res) => {
                setOrders(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const cancelOrder = (order) => {

        axios.put(`http://localhost:8080/orders/${order.id}`, {
            ...order,
            status: "Cancelled"
        })
            .then(() => {
                loadOrders();
            })
            .catch((err) => console.log(err));
    };

    return (
        <div style={{ padding: "40px" }}>

            <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
                📦 Order History
            </h1>

            {orders.length === 0 ? (
                <h2>No Orders Found</h2>
            ) : (
                orders.map((order) => (

                    <div
                        key={order.id}
                        style={{
                            border: "1px solid #ddd",
                            borderRadius: "12px",
                            padding: "20px",
                            marginBottom: "20px",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                        }}
                    >
                        <h2>{order.productName}</h2>

                        <p><b>Customer:</b> {order.customerName}</p>

                        <p><b>Quantity:</b> {order.quantity}</p>

                        <p><b>Total Price:</b> ₹{order.totalPrice}</p>

                        <p><b>Order ID:</b> {order.id}</p>

                        <p>
                            <b>Status:</b>{" "}
                            <span
                                style={{
                                    color:
                                        order.status === "Delivered"
                                            ? "green"
                                            : order.status === "Shipped"
                                                ? "blue"
                                                : order.status === "Cancelled"
                                                    ? "red"
                                                    : "orange",
                                    fontWeight: "bold"
                                }}
                            >
                                {order.status}
                            </span>
                        </p>

                        {order.status !== "Cancelled" &&
                            order.status !== "Delivered" && (
                                <button
                                    onClick={() => cancelOrder(order)}
                                    style={{
                                        background: "red",
                                        color: "white",
                                        border: "none",
                                        padding: "10px 18px",
                                        borderRadius: "8px",
                                        cursor: "pointer"
                                    }}
                                >
                                    Cancel Order
                                </button>
                            )}
                    </div>

                ))
            )}

        </div>
    );
}

export default OrderHistory;