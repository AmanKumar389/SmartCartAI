import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";

function ProductDetails() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [customerName, setCustomerName] = useState("");
    const [rating, setRating] = useState(5);
    const [reviewText, setReviewText] = useState("");
    const [averageRating, setAverageRating] = useState(0);
    const [reviewCount, setReviewCount] = useState(0);

    useEffect(() => {
        axios
            .get(`http://localhost:8080/products/${id}`)
            .then((res) => {
                setProduct(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
        axios
            .get(`http://localhost:8080/reviews/${id}`)
            .then((res) => {

                const reviewList = res.data;

                setReviews(reviewList);
                setReviewCount(reviewList.length);

                if (reviewList.length > 0) {

                    const total = reviewList.reduce(
                        (sum, review) => sum + review.rating,
                        0
                    );

                    setAverageRating(total / reviewList.length);

                } else {

                    setAverageRating(0);

                }

            })
            .catch((err) => {
                console.log(err);
            });
        axios
            .get(`http://localhost:8080/reviews/${id}`)
            .then((res) => {
                setReviews(res.data);
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


    const buyNow = () => {

        navigate("/payment", {
            state: {
                cartItems: [
                    {
                        id: product.id,
                        productName: product.name,
                        quantity: 1,
                        price: product.price
                    }
                ],
                totalPrice: product.price
            }
        });

    };
    const submitReview = () => {

        if (!customerName || !reviewText) {
            alert("Please fill all fields");
            return;
        }

        axios.post("http://localhost:8080/reviews", {
            productId: product.id,
            customerName: customerName,
            rating: rating,
            review: reviewText
        })
            .then(() => {

                alert("Review Added Successfully");

                return axios.get(`http://localhost:8080/reviews/${product.id}`);

            })
            .then((res) => {

                setReviews(res.data);
                const reviewList = res.data;

                setReviewCount(reviewList.length);

                if (reviewList.length > 0) {

                    const total = reviewList.reduce(
                        (sum, review) => sum + review.rating,
                        0
                    );

                    setAverageRating(total / reviewList.length);

                } else {

                    setAverageRating(0);

                }
                setCustomerName("");
                setReviewText("");
                setRating(5);

            })
            .catch((err) => {
                console.log(err);
                alert("Failed to Add Review");
            });

    };

    if (!product) {
        return (
            <h2
                style={{
                    textAlign: "center",
                    marginTop: "50px"
                }}
            >
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
                alignItems: "center",
                justifyContent: "center"
            }}
        >

            <img
                src={product.imageUrl}
                alt={product.name}
                width="350"
                height="350"
                style={{
                    objectFit: "cover",
                    borderRadius: "10px",
                    boxShadow: "0 4px 12px lightgray"
                }}
            />

            <div
                style={{
                    maxWidth: "500px"
                }}
            >

                <h1>{product.name}</h1>

                <h3 style={{ color: "#777" }}>
                    {product.category}
                </h3>

                <h2 style={{ color: "green" }}>
                    ₹{product.price}
                </h2>

                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        marginTop: "10px",
                        marginBottom: "15px"
                    }}
                >
    <span style={{ color: "#f39c12", fontSize: "20px" }}>
        ⭐
    </span>

                    <span style={{ fontWeight: "bold" }}>
        {averageRating.toFixed(1)} / 5
    </span>

                    <span style={{ color: "gray" }}>
        ({reviewCount} Reviews)
    </span>
                </div>


                <p
                    style={{
                        lineHeight: "28px",
                        color: "#555"
                    }}
                >
                    {product.description}
                </p>

                <div
                    style={{
                        display: "flex",
                        gap: "15px",
                        marginTop: "25px"
                    }}
                >

                    <button
                        onClick={addToCart}
                        style={{
                            padding: "14px 28px",
                            background: "#2874F0",
                            color: "white",
                            border: "none",
                            borderRadius: "8px",
                            cursor: "pointer",
                            fontSize: "16px"
                        }}
                    >
                        Add to Cart
                    </button>

                    <button
                        onClick={buyNow}
                        style={{
                            padding: "14px 28px",
                            background: "#FB641B",
                            color: "white",
                            border: "none",
                            borderRadius: "8px",
                            cursor: "pointer",
                            fontSize: "16px"
                        }}
                    >
                        Buy Now
                    </button>

                </div>


            </div>
            <div
                style={{
                    width: "100%",
                    maxWidth: "900px",
                    marginTop: "30px",
                    padding: "20px",
                    borderTop: "1px solid #ddd"
                }}
            >
                <h2>⭐ Write a Review</h2>

                <input
                    type="text"
                    placeholder="Your Name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    style={{
                        width: "100%",
                        padding: "10px",
                        marginBottom: "10px",
                        marginTop: "10px"
                    }}
                />

                <select
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    style={{
                        width: "100%",
                        padding: "10px",
                        marginBottom: "10px"
                    }}
                >
                    <option value={5}>⭐⭐⭐⭐⭐ (5)</option>
                    <option value={4}>⭐⭐⭐⭐ (4)</option>
                    <option value={3}>⭐⭐⭐ (3)</option>
                    <option value={2}>⭐⭐ (2)</option>
                    <option value={1}>⭐ (1)</option>
                </select>

                <textarea
                    placeholder="Write your review..."
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    rows="4"
                    style={{
                        width: "100%",
                        padding: "10px",
                        marginBottom: "10px"
                    }}
                />

                <button
                    onClick={submitReview}
                    style={{
                        background: "#28a745",
                        color: "white",
                        border: "none",
                        padding: "12px 25px",
                        borderRadius: "8px",
                        cursor: "pointer"
                    }}
                >
                    Submit Review
                </button>

                <hr style={{ margin: "30px 0" }} />

                <h2>📝 Customer Reviews</h2>

                {reviews.length > 0 ? (
                    reviews.map((review) => (
                        <div
                            key={review.id}
                            style={{
                                border: "1px solid #ddd",
                                borderRadius: "10px",
                                padding: "15px",
                                marginBottom: "15px",
                                background: "#fafafa"
                            }}
                        >
                            <h4 style={{ marginBottom: "5px" }}>
                                {review.customerName}
                            </h4>

                            <div style={{ color: "#f39c12", marginBottom: "8px" }}>
                                {"⭐".repeat(review.rating)}
                            </div>

                            <p style={{ margin: 0 }}>
                                {review.review}
                            </p>
                        </div>
                    ))
                ) : (
                    <p>No reviews yet.</p>
                )}
            </div>

        </div>

    );
}

export default ProductDetails;