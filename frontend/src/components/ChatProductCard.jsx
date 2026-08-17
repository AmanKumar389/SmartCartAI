import { useState } from "react";
import axios from "axios";

function ChatProductCard({ product }) {

    const [loading, setLoading] = useState(false);

    const addToCart = async () => {

        try {

            setLoading(true);

            await axios.post("http://localhost:8080/cart", {
                productId: product.id,
                productName: product.name,
                price: product.price,
                quantity: 1
            });

            alert("✅ Product added to cart!");

        } catch (error) {

            console.error(error);
            alert("❌ Failed to add product.");

        } finally {

            setLoading(false);

        }
    };

    return (
        <div
            style={{
                border: "1px solid #ddd",
                borderRadius: "10px",
                padding: "10px",
                marginTop: "10px",
                background: "#fff"
            }}
        >
            <img
                src={product.imageUrl}
                alt={product.name}
                style={{
                    width: "100%",
                    height: "150px",
                    objectFit: "cover",
                    borderRadius: "8px"
                }}
            />

            <h4>{product.name}</h4>

            <p><b>₹{product.price}</b></p>

            <p>{product.description}</p>

            <button
                onClick={addToCart}
                disabled={loading}
                style={{
                    width: "100%",
                    padding: "10px",
                    background: loading ? "#6c757d" : "#0d6efd",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    cursor: loading ? "not-allowed" : "pointer"
                }}
            >
                {loading ? "Adding..." : "🛒 Add to Cart"}
            </button>
        </div>
    );
}

export default ChatProductCard;