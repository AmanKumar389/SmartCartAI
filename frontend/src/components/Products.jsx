import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";

function Products({ search, category }) {

    const [products, setProducts] = useState([]);
    const [recommended, setRecommended] = useState([]);

    useEffect(() => {

        axios.get("http://localhost:8080/products")
            .then((res) => {
                setProducts(res.data);
            })
            .catch((err) => console.log(err));

    }, []);

    useEffect(() => {

        let url = "http://localhost:8080/products/recommend";

        if (category && category !== "All") {
            url += "?category=" + category;
        }

        axios.get(url)
            .then((res) => {
                setRecommended(res.data);
            })
            .catch((err) => console.log(err));

    }, [category]);

    const filteredProducts = products.filter((product) => {

        const matchSearch =
            product.name.toLowerCase().includes(search.toLowerCase());

        const matchCategory =
            category === "All" ||
            product.category.toLowerCase() === category.toLowerCase();

        return matchSearch && matchCategory;
    });

    return (
        <div style={{ padding: "20px" }}>

            <h2 style={{ textAlign: "center" }}>
                🔥 Trending Products
            </h2>

            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    gap: "20px",
                    marginBottom: "50px"
                }}
            >
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                        />
                    ))
                ) : (
                    <h3>No Products Found 😔</h3>
                )}
            </div>

            <h2 style={{ textAlign: "center" }}>
                🤖 AI Recommended Products
            </h2>

            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    gap: "20px",
                }}
            >
                {recommended.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                    />
                ))}
            </div>

        </div>
    );
}

export default Products;