import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaStar } from "react-icons/fa";

function ProductCard({ product }) {

    const navigate = useNavigate();

    const addToCart = (e) => {

        e.stopPropagation();

        axios.post("http://localhost:8080/cart", {
            productId: product.id,
            productName: product.name,
            price: product.price,
            quantity: 1
        })
            .then(() => {
                alert("Product Added to Cart");
            })
            .catch((err) => {
                console.log(err);
                alert("Failed to Add Product");
            });

    };

    const addToWishlist = (e) => {

        e.stopPropagation();

        axios.post("http://localhost:8080/wishlist", {
            productId: product.id,
            productName: product.name,
            price: product.price,
            imageUrl: product.imageUrl
        })
            .then(() => {
                alert("Added to Wishlist ❤️");
            })
            .catch((err) => {
                console.log(err);
                alert("Failed to Add Wishlist");
            });

    };

    return (
        <div
            onClick={() => navigate(`/product/${product.id}`)}
            style={{
                width: "230px",
                border: "1px solid #ddd",
                borderRadius: "12px",
                padding: "15px",
                textAlign: "center",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                cursor: "pointer",
                transition: "0.3s",
                background: "#fff"
            }}
            onMouseEnter={(e) =>
                e.currentTarget.style.transform = "scale(1.03)"
            }
            onMouseLeave={(e) =>
                e.currentTarget.style.transform = "scale(1)"
            }
        >

            <img
                src={product.imageUrl}
                alt={product.name}
                width="180"
                height="180"
                style={{ objectFit: "cover", borderRadius: "10px" }}
            />

            <h3>{product.name}</h3>

            <p>{product.category}</p>

            <div style={{ color: "#f39c12", marginBottom: "8px" }}>
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <span style={{ color: "black", marginLeft: "5px" }}>
                    (4.8)
                </span>
            </div>

            <h2 style={{ color: "green" }}>₹{product.price}</h2>

            <p>{product.description}</p>

            <button
                onClick={addToWishlist}
                style={{
                    background: "crimson",
                    color: "white",
                    border: "none",
                    padding: "10px",
                    borderRadius: "5px",
                    cursor: "pointer",
                    marginBottom: "8px",
                    width: "100%"
                }}
            >
                ❤️ Wishlist
            </button>

            <button
                onClick={addToCart}
                style={{
                    background: "#2874F0",
                    color: "white",
                    border: "none",
                    padding: "10px",
                    borderRadius: "5px",
                    cursor: "pointer",
                    marginBottom: "8px",
                    width: "100%"
                }}
            >
                Add to Cart
            </button>

            <button
                onClick={(e) => {
                    e.stopPropagation();
                    navigate("/payment");
                }}
                style={{
                    background: "#ff9800",
                    color: "white",
                    border: "none",
                    padding: "10px",
                    borderRadius: "5px",
                    cursor: "pointer",
                    width: "100%"
                }}
            >
                Buy Now
            </button>

        </div>
    );
}

export default ProductCard;