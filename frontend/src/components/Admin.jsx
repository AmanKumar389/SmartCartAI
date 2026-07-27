import { useEffect, useState } from "react";
import axios from "axios";

function Admin() {

    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);

    const [totalProducts, setTotalProducts] = useState(0);
    const [totalOrders, setTotalOrders] = useState(0);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalRevenue, setTotalRevenue] = useState(0);

    const emptyProduct = {
        name: "",
        category: "",
        price: "",
        description: "",
        imageUrl: ""
    };

    const [product, setProduct] = useState(emptyProduct);
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        loadProducts();
        loadOrders();
        loadDashboard();
    }, []);

    const loadDashboard = () => {
        axios.get("http://localhost:8080/dashboard")
            .then((res) => {
                setTotalProducts(res.data.totalProducts);
                setTotalOrders(res.data.totalOrders);
                setTotalUsers(res.data.totalUsers);
                setTotalRevenue(res.data.totalRevenue);
            })
            .catch((err) => console.log(err));
    };

    const loadProducts = () => {
        axios.get("http://localhost:8080/products")
            .then((res) => {
                setProducts(res.data);
            })
            .catch((err) => console.log(err));
    };

    const loadOrders = () => {
        axios.get("http://localhost:8080/orders")
            .then((res) => {
                setOrders(res.data);
            })
            .catch((err) => console.log(err));
    };

    const handleChange = (e) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value
        });
    };
    const addProduct = () => {

        if (
            product.name.trim() === "" ||
            product.category.trim() === "" ||
            product.price === "" ||
            product.description.trim() === "" ||
            product.imageUrl.trim() === ""
        ) {
            alert("Please fill all fields");
            return;
        }

        axios.post("http://localhost:8080/products", product)
            .then(() => {
                alert("Product Added Successfully");
                setProduct(emptyProduct);
                loadProducts();
                loadDashboard();
            })
            .catch(() => {
                alert("Failed to add product");
            });
    };

    const editProduct = (item) => {
        setEditingId(item.id);
        setProduct(item);
    };

    const updateProduct = () => {
        axios.put(`http://localhost:8080/products/${editingId}`, product)
            .then(() => {
                alert("Product Updated Successfully");
                setEditingId(null);
                setProduct(emptyProduct);
                loadProducts();
                loadDashboard();
            });
    };

    const deleteProduct = (id) => {
        if (!window.confirm("Delete this product?")) return;

        axios.delete(`http://localhost:8080/products/${id}`)
            .then(() => {
                alert("Product Deleted Successfully");
                loadProducts();
                loadDashboard();
            });
    };

    const updateStatus = (order, status) => {

        axios.put(`http://localhost:8080/orders/${order.id}`, {
            ...order,
            status: status
        }).then(() => {
            loadOrders();
            loadDashboard();
        });
    };

    return (
        <div style={{ padding: "30px" }}>

            <h1 style={{ textAlign: "center" }}>
                Admin Dashboard
            </h1>

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-around",
                    gap: "20px",
                    flexWrap: "wrap",
                    marginBottom: "30px"
                }}
            >

                <div style={{ background:"#2874F0",color:"white",padding:"20px",borderRadius:"10px",minWidth:"180px",textAlign:"center"}}>
                    <h2>{totalProducts}</h2>
                    <p>Total Products</p>
                </div>

                <div style={{ background:"green",color:"white",padding:"20px",borderRadius:"10px",minWidth:"180px",textAlign:"center"}}>
                    <h2>{totalOrders}</h2>
                    <p>Total Orders</p>
                </div>

                <div style={{ background:"#ff9800",color:"white",padding:"20px",borderRadius:"10px",minWidth:"180px",textAlign:"center"}}>
                    <h2>{totalUsers}</h2>
                    <p>Total Users</p>
                </div>

                <div style={{ background:"#e91e63",color:"white",padding:"20px",borderRadius:"10px",minWidth:"180px",textAlign:"center"}}>
                    <h2>₹{totalRevenue}</h2>
                    <p>Total Revenue</p>
                </div>

            </div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    width: "400px",
                    margin: "auto"
                }}
            >

                <input
                    type="text"
                    name="name"
                    placeholder="Product Name"
                    value={product.name}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    value={product.category}
                    onChange={handleChange}
                />

                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={product.price}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="description"
                    placeholder="Description"
                    value={product.description}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="imageUrl"
                    placeholder="Image URL"
                    value={product.imageUrl}
                    onChange={handleChange}
                />

                {editingId ? (
                    <>
                        <button onClick={updateProduct}>
                            Update Product
                        </button>

                        <button
                            onClick={() => {
                                setEditingId(null);
                                setProduct(emptyProduct);
                            }}
                        >
                            Cancel
                        </button>
                    </>
                ) : (
                    <button onClick={addProduct}>
                        Add Product
                    </button>
                )}

            </div>

            <hr />

            <h2>All Products</h2>
            {products.map((item) => (
                <div
                    key={item.id}
                    style={{
                        border: "1px solid #ddd",
                        borderRadius: "10px",
                        padding: "15px",
                        marginBottom: "20px",
                        display: "flex",
                        gap: "20px",
                        alignItems: "center"
                    }}
                >
                    <img
                        src={item.imageUrl}
                        alt={item.name}
                        width="120"
                        height="120"
                        style={{
                            objectFit: "cover",
                            borderRadius: "10px"
                        }}
                    />

                    <div style={{ flex: 1 }}>
                        <h3>{item.name}</h3>

                        <p><b>Category:</b> {item.category}</p>

                        <p><b>Price:</b> ₹{item.price}</p>

                        <p>{item.description}</p>

                        <button
                            onClick={() => editProduct(item)}
                            style={{
                                background: "#2874F0",
                                color: "white",
                                border: "none",
                                padding: "8px 15px",
                                borderRadius: "5px",
                                marginRight: "10px",
                                cursor: "pointer"
                            }}
                        >
                            Edit
                        </button>

                        <button
                            onClick={() => deleteProduct(item.id)}
                            style={{
                                background: "red",
                                color: "white",
                                border: "none",
                                padding: "8px 15px",
                                borderRadius: "5px",
                                cursor: "pointer"
                            }}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}

            <hr />

            <h2>All Orders</h2>
            {orders.map((order) => (
                <div
                    key={order.id}
                    style={{
                        border: "1px solid #ddd",
                        padding: "15px",
                        borderRadius: "10px",
                        marginBottom: "15px"
                    }}
                >
                    <h3>{order.productName}</h3>

                    <p><b>Customer:</b> {order.customerName}</p>

                    <p><b>Quantity:</b> {order.quantity}</p>

                    <p><b>Total:</b> ₹{order.totalPrice}</p>

                    <p><b>Status:</b> {order.status}</p>

                    <button onClick={() => updateStatus(order, "Shipped")}>
                        Shipped
                    </button>

                    <button
                        onClick={() => updateStatus(order, "Delivered")}
                        style={{ marginLeft: "10px" }}
                    >
                        Delivered
                    </button>
                </div>
            ))}

        </div>
    );
}

export default Admin;

