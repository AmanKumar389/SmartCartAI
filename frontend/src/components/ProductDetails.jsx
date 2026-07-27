import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function ProductDetails() {

    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        axios
            .get(`http://localhost:8080/products/${id}`)
            .then((res) => {
                setProduct(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id]);

    const addToCart = () => {
        axios.post("http://localhost:8080/cart", {
            productId: product.id,
            productName: product.name,
            price: product.price,
            quantity: 1
        })
            .then(() => {
                alert("Product Added to Cart");
            })
            .catch(() => {
                alert("Failed to Add Product");
            });
    };

    if (!product) {
        return (
            <h2 style={{ textAlign: "center", marginTop: "50px" }}>
                Loading Product...
            </h2>
        );
    }

    return (
        <div
            style={{
                display: "flex",
                gap: "40px",
                padding: "40px",
                flexWrap: "wrap",
                alignItems: "center"
            }}
        >
            <img
                src={product.imageUrl}
                alt={product.name}
                width="350"
                style={{
                    borderRadius: "10px",
                    boxShadow: "0 2px 10px lightgray"
                }}
            />

            <div style={{ flex: 1 }}>
                <h1>{product.name}</h1>

                <h2 style={{ color: "green" }}>
                    ₹{product.price}
                </h2>

                <p>
                    <b>Category:</b> {product.category}
                </p>

                <p>{product.description}</p>

                <button
                    onClick={addToCart}
                    style={{
                        padding: "12px 25px",
                        background: "#2874F0",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        marginRight: "10px",
                        cursor: "pointer"
                    }}
                >
                    Add to Cart
                </button>

                <button
                    style={{
                        padding: "12px 25px",
                        background: "#FB641B",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer"
                    }}
                >
                    Buy Now
                </button>
            </div>
        </div>
    );
}

export default ProductDetails;