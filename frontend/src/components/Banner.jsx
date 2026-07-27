function Banner() {
    return (
        <div
            style={{
                margin: "20px",
                background: "linear-gradient(90deg,#2874F0,#00C6FF)",
                color: "white",
                borderRadius: "10px",
                padding: "40px",
                textAlign: "center",
            }}
        >
            <h1>🔥 SmartCart AI Mega Sale</h1>
            <h2>Up to 70% OFF</h2>
            <p>Mobiles | Laptops | Fashion | Electronics</p>

            <button
                style={{
                    padding: "12px 25px",
                    background: "yellow",
                    color: "black",
                    border: "none",
                    borderRadius: "5px",
                    fontWeight: "bold",
                    cursor: "pointer",
                }}
            >
                Shop Now
            </button>
        </div>
    );
}

export default Banner;