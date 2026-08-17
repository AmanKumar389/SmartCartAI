import { useEffect, useState } from "react";
import axios from "axios";

function Profile() {

    const token = localStorage.getItem("token");

    const [user, setUser] = useState({
        name: "",
        email: "",
        mobile: "",
        address: "",
        profileImage: ""
    });

    const [password, setPassword] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        try {

            const res = await axios.get(
                "http://localhost:8080/user/profile",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setUser(res.data);

        } catch (err) {
            console.log(err);
            alert("Unable to load profile");
        }
    };

    const updateProfile = async () => {

        try {

            await axios.put(
                "http://localhost:8080/user/profile",
                user,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert("Profile Updated Successfully");

        } catch (err) {
            console.log(err);
            alert("Update Failed");
        }
    };

    const changePassword = async () => {

        if (password.newPassword !== password.confirmPassword) {
            alert("New Password and Confirm Password do not match");
            return;
        }

        try {

            await axios.post(
                "http://localhost:8080/user/change-password",
                {
                    currentPassword: password.currentPassword,
                    newPassword: password.newPassword
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert("Password Changed Successfully");

            setPassword({
                currentPassword: "",
                newPassword: "",
                confirmPassword: ""
            });

        } catch (err) {
            console.log(err);
            alert("Current Password is Incorrect");
        }
    };

    return (

        <div
            style={{
                width: "500px",
                margin: "40px auto",
                padding: "30px",
                boxShadow: "0 0 10px gray",
                borderRadius: "10px"
            }}
        >

            <h2 align="center">My Profile</h2>

            <input
                type="text"
                placeholder="Name"
                value={user.name}
                onChange={(e) =>
                    setUser({ ...user, name: e.target.value })
                }
                style={{ width: "100%", padding: 10, marginBottom: 15 }}
            />

            <input
                type="email"
                value={user.email}
                readOnly
                style={{ width: "100%", padding: 10, marginBottom: 15 }}
            />

            <input
                type="text"
                placeholder="Mobile"
                value={user.mobile || ""}
                onChange={(e) =>
                    setUser({ ...user, mobile: e.target.value })
                }
                style={{ width: "100%", padding: 10, marginBottom: 15 }}
            />

            <textarea
                placeholder="Address"
                value={user.address || ""}
                onChange={(e) =>
                    setUser({ ...user, address: e.target.value })
                }
                style={{
                    width: "100%",
                    height: "100px",
                    padding: 10,
                    marginBottom: 15
                }}
            />

            <button
                onClick={updateProfile}
                style={{
                    width: "100%",
                    padding: "12px",
                    background: "#2874F0",
                    color: "white",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "16px",
                    marginBottom: "30px"
                }}
            >
                Save Profile
            </button>

            <hr />

            <h2 align="center">Change Password</h2>

            <input
                type="password"
                placeholder="Current Password"
                value={password.currentPassword}
                onChange={(e) =>
                    setPassword({
                        ...password,
                        currentPassword: e.target.value
                    })
                }
                style={{ width: "100%", padding: 10, marginBottom: 15 }}
            />

            <input
                type="password"
                placeholder="New Password"
                value={password.newPassword}
                onChange={(e) =>
                    setPassword({
                        ...password,
                        newPassword: e.target.value
                    })
                }
                style={{ width: "100%", padding: 10, marginBottom: 15 }}
            />

            <input
                type="password"
                placeholder="Confirm Password"
                value={password.confirmPassword}
                onChange={(e) =>
                    setPassword({
                        ...password,
                        confirmPassword: e.target.value
                    })
                }
                style={{ width: "100%", padding: 10, marginBottom: 15 }}
            />

            <button
                onClick={changePassword}
                style={{
                    width: "100%",
                    padding: "12px",
                    background: "green",
                    color: "white",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "16px"
                }}
            >
                Change Password
            </button>

        </div>
    );
}

export default Profile;