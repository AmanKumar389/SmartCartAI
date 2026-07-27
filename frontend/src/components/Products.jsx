import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";

function Products({ search, category }) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:8080/products")
            .then((res) => {
                console.log("API Response:", res.data);
                setProducts(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    // Live Search Filter
    console.log("Selected Category:", category);
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
        </div>
    );
}

export default Products;