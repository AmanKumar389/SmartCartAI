function Categories({ setCategory }) {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "space-around",
                backgroundColor: "#ffffff",
                padding: "15px",
                boxShadow: "0px 2px 5px lightgray",
            }}
        >
            <h4
                onClick={() => setCategory("Home")}
                style={{ cursor: "pointer" }}
            >
                🏠 Home
            </h4>

            <h4
                onClick={() => setCategory("Mobiles")}
                style={{ cursor: "pointer" }}
            >
                📱 Mobiles
            </h4>

            <h4
                onClick={() => setCategory("Laptops")}
                style={{ cursor: "pointer" }}
            >
                💻 Laptops
            </h4>

            <h4
                onClick={() => setCategory("Fashion")}
                style={{ cursor: "pointer" }}
            >
                👕 Fashion
            </h4>

            <h4
                onClick={() => setCategory("Electronics")}
                style={{ cursor: "pointer" }}
            >
                🎧 Electronics
            </h4>





            <h4
                onClick={() => setCategory("Books")}
                style={{ cursor: "pointer" }}
            >
                📚 Books
            </h4>


            <h4
                onClick={() => setCategory("Sports")}
                style={{ cursor: "pointer" }}
            >
                ⚽ Sports
            </h4>
        </div>
    );
}

export default Categories;