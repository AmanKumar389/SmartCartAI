import { useEffect, useState } from "react";
import axios from "axios";

function Wishlist() {

    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        loadWishlist();
    }, []);

    const loadWishlist = () => {
        axios.get("http://localhost:8080/wishlist")
            .then((res) => {
                setWishlist(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const removeWishlist = (id) => {
        axios.delete(`http://localhost:8080/wishlist/${id}`)
            .then(() => {
                alert("Removed from Wishlist");
                loadWishlist();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const moveToCart = (item) => {

        axios.post("http://localhost:8080/cart", {
            productId: item.productId,
            productName: item.productName,
            price: item.price,
            quantity: 1
        })
            .then(() => {
                axios.delete(`http://localhost:8080/wishlist/${item.id}`)
                    .then(() => {
                        alert("Moved to Cart");
                        loadWishlist();
                    });
            })
            .catch((err) => {
                console.log(err);
            });

    };

    return (
        <div style={{ padding: "30px" }}>

            <h1 style={{ textAlign: "center" }}>
                ❤️ My Wishlist
            </h1>

            {wishlist.length === 0 ? (
                <h2 style={{ textAlign: "center" }}>
                    Wishlist is Empty
                </h2>
            ) : (

                <div
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "20px",
                        justifyContent: "center"
                    }}
                >

                    {wishlist.map((item) => (

                        <div
                            key={item.id}
                            style={{
                                width: "230px",
                                border: "1px solid lightgray",
                                borderRadius: "10px",
                                padding: "15px",
                                textAlign: "center",
                                boxShadow: "0 2px 10px lightgray"
                            }}
                        >

                            <img
                                src={item.imageUrl}
                                alt={item.productName}
                                width="180"
                                height="180"
                                style={{ objectFit: "cover" }}
                            />

                            <h3>{item.productName}</h3>

                            <h2 style={{ color: "green" }}>
                                ₹{item.price}
                            </h2>

                            <button
                                onClick={() => moveToCart(item)}
                                style={{
                                    background: "#2874F0",
                                    color: "white",
                                    border: "none",
                                    padding: "10px",
                                    width: "100%",
                                    marginBottom: "10px",
                                    borderRadius: "5px",
                                    cursor: "pointer"
                                }}
                            >
                                Move to Cart
                            </button>

                            <button
                                onClick={() => removeWishlist(item.id)}
                                style={{
                                    background: "crimson",
                                    color: "white",
                                    border: "none",
                                    padding: "10px",
                                    width: "100%",
                                    borderRadius: "5px",
                                    cursor: "pointer"
                                }}
                            >
                                Remove
                            </button>

                        </div>

                    ))}

                </div>

            )}

        </div>
    );
}

export default Wishlist;